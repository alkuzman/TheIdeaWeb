import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {JwtSecurityContext} from "../../authentication/jwt/jwt-security-context.service";
import {KeysService} from "../keys/keys.service";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import {UserService} from "../../../domain/services/user/user.service";
import {CertificateService} from "../../../domain/services/certificate/certificate.service";
import {HelperService} from "../helper.service";
import {ParserPemService} from "../parsers/parser-pem.service";
import {NoticeService} from "../../../domain/services/notice/notice.service";
import {PriceRequestPhaseData} from "../../../domain/model/security/data/price-request-phase-data";
import {ProtocolSession} from "../../../domain/model/security/protocol-session";
import {ProtocolTransactionStepNotice} from "../../../domain/model/security/notices/protocol-transaction-step-notice";
import {ProtocolTransactionStepNoticeConstructor} from "./protocol-transaction-step-notice-constructor.service";
import {ProtocolTransactionStepThreeNotice} from "../../../domain/model/security/notices/protocol-transaction-step-three-notice";
import {ProtocolTransactionStepOneNotice} from "../../../domain/model/security/notices/protocol-transaction-step-one-notice";
import {ProtocolTransactionStepTwoNotice} from "../../../domain/model/security/notices/protocol-transaction-step-two-notice";
import {ProtocolParticipantOneSessionData} from "../../../domain/model/security/protocol-participant-one-session-data";
import {SimpleSecurityProfile} from "../../../domain/model/security/simple-security-profile";
import {SecurityProfileConstructorService} from "./security-profile-constructor.service";
import {SimpleCryptographicOperations} from "../cryptographic-operations/simple-cryptographic-operations";
import {AlgorithmService} from "../algorithms/algorithms.service";
/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class ProtocolMessagesBuilderService {

    private securityProfile: SecurityProfile;

    constructor(private helper: HelperService,
                private keysService: KeysService,
                private userService: UserService,
                private pemParser: ParserPemService,
                private noticeService: NoticeService,
                private securityContext: JwtSecurityContext,
                private certificateService: CertificateService,
                private algorithmService: AlgorithmService,
                private cryptographicOperations: CryptographicOperations,
                private simpleCryptographicOperations: SimpleCryptographicOperations,
                private securityProfileConstructor: SecurityProfileConstructorService,
                private protocolTransactionStepNoticeConstructor: ProtocolTransactionStepNoticeConstructor) {

        this.initializeSecurityProfile();
    }

    private initializeSecurityProfile(): void {
        this.securityProfile = this.securityContext.securityProfile;
        this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
            this.securityProfile = securityProfile;
        });
    }

    private sendMessage(notice: ProtocolTransactionStepNotice<any>) {
        console.log(notice.type);
        console.log(notice.protocolSession);
        if (notice.previousStepNotice != null) {
            notice.previousStepNotice.activated = true;
        }
        this.noticeService.addNotice(notice).subscribe(() => {
            console.log("SENT");
        });
    }

    public buildProtocolMessageOne(userData: PriceRequestPhaseData, password: string, previousData: PriceRequestPhaseData,
                                   protocolSession: ProtocolSession, previousNotice: ProtocolTransactionStepThreeNotice) {

        // Initialize Simple Security Profile
        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
            .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

                // Retrieve other party public key
                this.certificateService.getPublicKey({email: protocolSession.idea.owner.email})
                    .subscribe((otherPartyPublicKeyForEncryptionPEM: string) => {

                        console.log("Parse pem public key");

                        // Parse the public key from pem format
                        this.pemParser.parsePublicKeyFromPem(otherPartyPublicKeyForEncryptionPEM)
                            .subscribe((otherPartyPublicKeyForEncryption: CryptoKey) => {

                                // Generate the session key that will be used
                                this.keysService.generateSymmetricKey()
                                    .then((sessionKey: CryptoKey) => {

                                        console.log("generate session key");

                                        // Add the session key encrypted with own public key into protocol session
                                        this.keysService.encryptSessionKey(sessionKey, simpleSecurityProfile.publicKey)
                                            .subscribe((encryptedSessionKey: string) => {
                                                if (protocolSession.participantOneSessionData == null) {
                                                    let participant: ProtocolParticipantOneSessionData = new ProtocolParticipantOneSessionData();
                                                    participant.participant = this.userService.getAuthenticatedUser();
                                                    participant.sessionKeyEncrypted = encryptedSessionKey;
                                                    protocolSession.participantOneSessionData = participant;
                                                }

                                                // Add the session key encrypted with other party public key into protocol session
                                                this.keysService.encryptSessionKey(sessionKey, otherPartyPublicKeyForEncryption)
                                                    .subscribe((ownerEncryptedSessionKey: string) => {
                                                        if (protocolSession.participantTwoSessionData == null) {
                                                            let participant = new ProtocolParticipantOneSessionData();
                                                            participant.participant = protocolSession.idea.owner;
                                                            participant.sessionKeyEncrypted = ownerEncryptedSessionKey;
                                                            protocolSession.participantTwoSessionData = participant;
                                                        }


                                                        console.log("export session key");

                                                        // Export the session key into raw format
                                                        this.keysService.exportKey(sessionKey, 'raw')
                                                            .subscribe((keyRaw: string) => {

                                                                // Create message object
                                                                let Kcm: string = keyRaw;
                                                                let N: string = this.simpleCryptographicOperations.generateNonce();
                                                                let obj = {
                                                                    'key': Kcm,
                                                                    'nonce': N,
                                                                    'identity': this.userService.getAuthenticatedUser().email
                                                                };
                                                                let jsonObj: string = JSON.stringify(obj);

                                                                console.log("encrypt");

                                                                // Encrypt message object with other party encryption public key
                                                                this.cryptographicOperations.encrypt(
                                                                    this.algorithmService.getAsymmetricEncryptionAlgorithm().algorithm,
                                                                    otherPartyPublicKeyForEncryption, jsonObj)
                                                                    .subscribe((initDataEncryption: string) => {
                                                                        let hashInitData: string = this.simpleCryptographicOperations.hash(jsonObj);


                                                                        console.log("sign");

                                                                        // Sign hashed message object
                                                                        this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                                                                            simpleSecurityProfile.privateKeySigning, hashInitData)
                                                                            .subscribe((signedHashedInitData: string) => {

                                                                                // Create message data
                                                                                let TID: number = 1;
                                                                                let productID: number = protocolSession.idea.id;
                                                                                if (previousNotice != null) {
                                                                                    TID = previousData.tID + 1;
                                                                                    productID = previousData.productID;
                                                                                }
                                                                                let data = {
                                                                                    'productID': productID,
                                                                                    'bid': userData.price,
                                                                                    'TID': TID
                                                                                };
                                                                                let jsonData: string = JSON.stringify(data);

                                                                                // Encrypt message data with session key
                                                                                this.cryptographicOperations.encrypt(
                                                                                    this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                                                                                    sessionKey, jsonData).subscribe((dataEncrypted: string) => {
                                                                                    let hashedDataEncrypted: string = this.simpleCryptographicOperations.hash(dataEncrypted);

                                                                                    console.log("final");

                                                                                    // Construct final message
                                                                                    let message = {
                                                                                        'signature': signedHashedInitData,
                                                                                        'object': initDataEncryption,
                                                                                        'data': dataEncrypted,
                                                                                        'hashedData': hashedDataEncrypted
                                                                                    };
                                                                                    let jsonMessage: string = JSON.stringify(message);
                                                                                    console.log(jsonMessage);

                                                                                    // Construct notice and send notice
                                                                                    this.sendMessage(this.protocolTransactionStepNoticeConstructor
                                                                                        .constructProtocolTransactionStepOneNotice(protocolSession, jsonMessage,
                                                                                            this.userService.getAuthenticatedUser(),
                                                                                            <ProtocolTransactionStepThreeNotice>previousNotice,
                                                                                            previousNotice == null ? protocolSession.idea.owner : previousNotice.originator));

                                                                                });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });

                            });

                    });
            });
    }

    public buildProtocolMessageTwo(userData: PriceRequestPhaseData, password: string,
                                   previousMessageData: PriceRequestPhaseData, protocolSession: ProtocolSession,
                                   previousNotice: ProtocolTransactionStepOneNotice) {

        // Create message data
        let data = {
            'productID': previousMessageData.productID,
            'price': userData.price,
            'nonce': previousMessageData.nonce,
            'TID': previousMessageData.tID
        };
        let jsonData: string = JSON.stringify(data);

        // Initialize Simple Security Profile
        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
            .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

                // Extract session key
                this.keysService.decryptSessionKey(this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                    simpleSecurityProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                    // Encrypt message data with session key
                    this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                        sessionKey, jsonData).subscribe((encryptedData: string) => {
                        let encryptedDataHash = this.simpleCryptographicOperations.hash(encryptedData);

                        // Construct final message
                        let message = {
                            'data': encryptedData,
                            'hashedData': encryptedDataHash
                        };
                        let jsonMessage: string = JSON.stringify(message);
                        console.log(jsonMessage);

                        // Construct notice
                        let notice: ProtocolTransactionStepTwoNotice = this.protocolTransactionStepNoticeConstructor
                            .constructProtocolTransactionStepTwoNotice(protocolSession, jsonMessage,
                                this.userService.getAuthenticatedUser(),
                                <ProtocolTransactionStepOneNotice>previousNotice,
                                previousNotice.originator);
                        console.log(notice);

                        // Send notice
                        this.sendMessage(notice);
                    });
                });
            });
    }

    public buildProtocolMessageThree(userData: PriceRequestPhaseData, password: string,
                                     previousMessageData: PriceRequestPhaseData,
                                     protocolSession: ProtocolSession,
                                     previousNotice: ProtocolTransactionStepTwoNotice) {

        // Initialize Simple Security Profile
        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
            .subscribe((simpleProfile: SimpleSecurityProfile) => {

                // Construct message data
                let data = {
                    "identity": this.userService.getAuthenticatedUser().email,
                    "TID": previousMessageData.tID,
                    "nonce": previousMessageData.nonce
                };

                // Convert the message data into JSON
                let jsonData: string = JSON.stringify(data);

                // Extract The Session Key
                this.keysService.decryptSessionKey(this.helper
                        .getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                    simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                    // Encrypt the json from the message data with the session key
                    this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                        sessionKey, jsonData).subscribe((dataEncrypted: string) => {

                        // Hash the json from the message data
                        let hashedData: string = this.simpleCryptographicOperations.hash(jsonData);

                        // Sign the hash
                        this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                            simpleProfile.privateKeySigning, hashedData).subscribe((signedHashedData: string) => {

                            let message = {
                                "signature": signedHashedData,
                                "data": dataEncrypted
                            };
                            let jsonMessage: string = JSON.stringify(message);
                            let notice: ProtocolTransactionStepThreeNotice = this.protocolTransactionStepNoticeConstructor
                                .constructProtocolTransactionStepThreeNotice(protocolSession, jsonMessage,
                                    this.userService.getAuthenticatedUser(),
                                    <ProtocolTransactionStepTwoNotice>previousNotice,
                                    previousNotice.originator);
                            console.log(notice);
                            this.sendMessage(notice);
                        });
                    })
                });

            });

    }


}
