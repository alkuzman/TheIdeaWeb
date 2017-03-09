import {Injectable, OnInit} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {JwtSecurityContext} from "../../authentication/jwt/jwt-security-context.service";
import {KeysService} from "../keys/keys.service";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import {UserService} from "../../../domain/services/user/user.service";
import {CertificateService} from "../../../domain/services/certificate/certificate.service";
import {Agent} from "../../../domain/model/authentication/agent";
import {HelperService} from "../helper.service";
import {Observable} from "rxjs";
import {ParserPemService} from "../parsers/parser-pem.service";
import {ProtocolTransaction} from "../../../domain/model/security/protocol-transaction";
import {ProtocolTransactionStep} from "../../../domain/model/security/protocol-transaction-step";
import {ProtocolTransactionMessageNumber} from "../../../domain/model/enumerations/protocol-transaction-message-number";
import {BuyingTransactionNotice} from "../../../domain/model/security/buying-transaction-notice";
import {NoticeService} from "../../../domain/services/notice/notice.service";
import {Recipient} from "../../../domain/model/sharing/recipient";
import {Notice} from "../../../domain/model/sharing/notice";
import {BuyingTransaction} from "../../../domain/model/security/buying-transaction";
import {Idea} from "../../../domain/model/ideas/idea";
import {Price} from "../../../domain/model/helpers/price";
import {PriceRequestPhaseData} from "../../../domain/model/security/data/price-request-phase-data";
/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class ProtocolMessagesBuilderService {

    //private securityProfileEncryption: SecurityProfile;
    //private securityProfileSigning: SecurityProfile;
    private securityProfile: SecurityProfile;

    constructor(private securityContext: JwtSecurityContext, private certificateService: CertificateService,
                private keysService: KeysService, private cryptographicOperations: CryptographicOperations,
                private userService: UserService, private helper: HelperService,
                private pemParser: ParserPemService, private noticeService: NoticeService) {

        //this.initializeSecurityProfiles();
        this.initializeSecurityProfile();
    }

    private initializeSecurityProfile(): void {
        this.securityProfile = this.securityContext.securityProfile;
        this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
            this.securityProfile = securityProfile;
        });
    }

    /*
     private initializeSecurityProfiles(): void {
     this.securityProfileEncryption = this.securityContext.securityProfileEncryption;
     this.securityProfileSigning = this.securityContext.securityProfileSigning;
     this.securityContext.securityProfileEncryptionObservable().subscribe((securityProfile: SecurityProfile) => {
     console.log(securityProfile);
     this.securityProfileEncryption = securityProfile;
     });
     this.securityContext.securityProfileSigningObservable().subscribe((securityProfile: SecurityProfile) => {
     console.log(securityProfile);
     this.securityProfileSigning = securityProfile;
     });
     }
     */

    private createNewTransaction(transaction: BuyingTransaction): BuyingTransaction {
        let transac: BuyingTransaction = new BuyingTransaction();
        transac.members = transaction.members;
        transac.currentStep = transaction.currentStep;
        transac.messages = transaction.messages;
        transac.idea =transaction.idea;
        return transac;
    }

    private sendMessage(buyingTransaction: BuyingTransaction, message: string,
                        stepNumber: ProtocolTransactionMessageNumber) {
        // Adding the message in the Protocol transaction
        let step: ProtocolTransactionStep = new ProtocolTransactionStep();
        step.stepMessage = message;
        step.stepNumber = stepNumber;
        step.creator = this.userService.getAuthenticatedUser();
        buyingTransaction.messages.push(step);
        buyingTransaction.currentStep = ProtocolTransactionMessageNumber.next(buyingTransaction.currentStep);

        buyingTransaction = this.createNewTransaction(buyingTransaction);

        // Creating notice for the protocol transaction
        let notice: BuyingTransactionNotice = new BuyingTransactionNotice();
        notice.buyingTransaction = buyingTransaction;
        notice.originator = this.userService.getAuthenticatedUser();

        // Initialize recipient
        let recipient: Recipient = new Recipient();
        for (let member of buyingTransaction.members) {
            if (member.email != this.userService.getAuthenticatedUser().email) {
                recipient.agent = member;
                notice.recipients.push(recipient);
            }
        }
        this.noticeService.addNotice(notice).subscribe((notice: Notice) => {
            console.log("SENT");
        });
    }

    public buildProtocolMessageOne(userData: PriceRequestPhaseData, password: string, transaction: BuyingTransaction) {
        this.certificateService.getPublicKey({email: transaction.idea.owner.email})
            .subscribe((pemPublicKeyEncryption: string) => {

                this.pemParser.parsePublicKeyFromPem(pemPublicKeyEncryption)
                    .subscribe((ownerPublicKeyEncryption: CryptoKey) => {
                        this.keysService.generateSymmetricKey()
                            .then((key: CryptoKey) => {
                                this.keysService.exportKey(key, 'raw')
                                    .then((keyBuffer: ArrayBuffer) => {
                                        let Kcm: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(keyBuffer));
                                        let N: string = this.cryptographicOperations.generateNonce();
                                        let obj = {
                                            'key': Kcm,
                                            'nonce': N,
                                            'identity': this.userService.getAuthenticatedUser().email
                                        };
                                        let jsonObj: string = JSON.stringify(obj);
                                        this.cryptographicOperations.encrypt(
                                            this.cryptographicOperations.getAlgorithm('RSA-OAEP', 'SHA256', 'encrypt').algorithm,
                                            ownerPublicKeyEncryption,
                                            this.cryptographicOperations.convertStringToBuffer(jsonObj))
                                            .then((initDataEncryptionBuf: ArrayBuffer) => {
                                                let initDataEncryption: string = this.cryptographicOperations
                                                    .convertUint8ToString(new Uint8Array(initDataEncryptionBuf));
                                                let hashInitData: string = this.cryptographicOperations.hash(jsonObj);
                                                this.keysService.extractPrivateKey(this.securityProfile.encryptedPrivateKey, password,
                                                    this.helper.ASYMMETRIC_SIGNING_ALG)
                                                    .subscribe((privateSigningKey: CryptoKey) => {
                                                        this.cryptographicOperations.sign(this.helper.ASYMMETRIC_SIGNING_ALG, privateSigningKey,
                                                            this.cryptographicOperations.convertStringToUint8(hashInitData).buffer)
                                                            .then((signedHashedInitDataBuf: ArrayBuffer) => {
                                                                let signedHashedInitData: string = this.cryptographicOperations
                                                                    .convertUint8ToString(new Uint8Array(signedHashedInitDataBuf));
                                                                console.log(signedHashedInitData);
                                                                let data = {
                                                                    'bid': userData.price
                                                                };
                                                                let jsonData: string = JSON.stringify(data);
                                                                this.cryptographicOperations.encrypt(
                                                                    this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA256', 'encrypt').algorithm,
                                                                    key,
                                                                    this.cryptographicOperations.convertStringToBuffer(jsonData))
                                                                    .then((dataEncryptedBuf: ArrayBuffer) => {
                                                                        let dataEncrypted: string = this.cryptographicOperations
                                                                            .convertUint8ToString(new Uint8Array(dataEncryptedBuf));
                                                                        let hashedDataEncrypted: string = this.cryptographicOperations.hash(dataEncrypted);
                                                                        let message = {
                                                                            'signature': signedHashedInitData,
                                                                            'object': initDataEncryption,
                                                                            'data': dataEncrypted,
                                                                            'hashedData': hashedDataEncrypted
                                                                        };
                                                                        let jsonMessage: string = JSON.stringify(message);
                                                                        console.log(jsonMessage);
                                                                        this.sendMessage(transaction, jsonMessage,
                                                                            ProtocolTransactionMessageNumber.MONE);
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });

            });
    }

    public buildProtocolMessageTwo(userData: PriceRequestPhaseData, previousMessageData: PriceRequestPhaseData,
                                   transaction: BuyingTransaction) {
        let data = {
            'price': userData.price,
            'nonce': previousMessageData.nonce
        };
        let jsonData: string = JSON.stringify(data);
        this.cryptographicOperations.encrypt(this.cryptographicOperations.getAlgorithm(this.helper.SYMMETRIC_ALG,
            this.helper.HASH_ALG, "encrypt").algorithm, previousMessageData.key, this.cryptographicOperations
            .convertStringToBuffer(jsonData)).then((encryptedDataBuffer: ArrayBuffer) => {
            let encryptedData: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(encryptedDataBuffer));
            let encryptedDataHash = this.cryptographicOperations.hash(encryptedData);
            let message = {
                'data': encryptedData,
                'hashedData': encryptedDataHash
            };
            let jsonMessage: string = JSON.stringify(message);
            console.log(jsonMessage);
            this.sendMessage(transaction, jsonMessage,
                ProtocolTransactionMessageNumber.MTWO);

        });
    }
}
