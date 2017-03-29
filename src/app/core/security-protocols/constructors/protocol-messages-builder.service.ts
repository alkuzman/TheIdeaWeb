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
/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class ProtocolMessagesBuilderService {

    private securityProfile: SecurityProfile;

    constructor(private securityContext: JwtSecurityContext, private certificateService: CertificateService,
                private keysService: KeysService, private cryptographicOperations: CryptographicOperations,
                private userService: UserService, private helper: HelperService,
                private pemParser: ParserPemService, private noticeService: NoticeService,
                private protocolTransactionStepNoticeConstructor: ProtocolTransactionStepNoticeConstructor,
                private securityProfileConstructor: SecurityProfileConstructorService) {

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

        // Retrieve other party public key
        this.certificateService.getPublicKey({email: protocolSession.idea.owner.email})
            .subscribe((pemPublicKeyEncryption: string) => {

                    // Parse the public key from pem format
                    this.pemParser.parsePublicKeyFromPem(pemPublicKeyEncryption)
                        .subscribe((ownerPublicKeyEncryption: CryptoKey) => {

                            // Generate the session key that will be used
                            this.keysService.generateSymmetricKey()
                                .then((key: CryptoKey) => {

                                    // Parse own public key from pem format
                                    this.pemParser.parsePublicKeyFromPem(this.securityProfile.encryptionPair.publicPem)
                                        .subscribe((ownPublicKeyEncryption: CryptoKey) => {

                                            // Add the session key encrypted with own public key into protocol session
                                            this.keysService.insertSessionKey(key, ownPublicKeyEncryption)
                                                .subscribe((encryptedSessionKey: string) => {
                                                    if (protocolSession.participantOneSessionData == null) {
                                                        let participant: ProtocolParticipantOneSessionData = new ProtocolParticipantOneSessionData();
                                                        participant.participant = this.userService.getAuthenticatedUser();
                                                        participant.sessionKeyEncrypted = encryptedSessionKey;
                                                        protocolSession.participantOneSessionData = participant;
                                                    }

                                                    // Add the session key encrypted with other party public key into protocol session
                                                    this.keysService.insertSessionKey(key, ownerPublicKeyEncryption)
                                                        .subscribe((ownerEncryptedSessionKey: string) => {
                                                            if (protocolSession.participantTwoSessionData == null) {
                                                                let participant = new ProtocolParticipantOneSessionData();
                                                                participant.participant = protocolSession.idea.owner;
                                                                participant.sessionKeyEncrypted = ownerEncryptedSessionKey;
                                                                protocolSession.participantTwoSessionData = participant;
                                                            }

                                                            // Export the session key as CryptoKey
                                                            this.keysService.exportKey(key, 'raw')
                                                                .then((keyBuffer: ArrayBuffer) => {

                                                                    // Create message object
                                                                    let Kcm: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(keyBuffer));
                                                                    let N: string = this.cryptographicOperations.generateNonce();
                                                                    let obj = {
                                                                        'key': Kcm,
                                                                        'nonce': N,
                                                                        'identity': this.userService.getAuthenticatedUser().email
                                                                    };
                                                                    let jsonObj: string = JSON.stringify(obj);

                                                                    // Encrypt message object with other party encryption public key
                                                                    this.cryptographicOperations.encrypt(
                                                                        this.cryptographicOperations.getAlgorithm('RSA-OAEP', 'SHA256', 'encrypt').algorithm,
                                                                        ownerPublicKeyEncryption,
                                                                        this.cryptographicOperations.convertStringToBuffer(jsonObj))
                                                                        .then((initDataEncryptionBuf: ArrayBuffer) => {
                                                                            let initDataEncryption: string = this.cryptographicOperations
                                                                                .convertUint8ToString(new Uint8Array(initDataEncryptionBuf));
                                                                            let hashInitData: string = this.cryptographicOperations.hash(jsonObj);

                                                                            // Extract own signing private key
                                                                            this.keysService.extractPrivateKey(this.securityProfile.encryptedPrivateKey, password,
                                                                                this.helper.ASYMMETRIC_SIGNING_ALG)
                                                                                .subscribe((privateSigningKey: CryptoKey) => {

                                                                                    // Sign hashed message object
                                                                                    this.cryptographicOperations.sign(this.helper.ASYMMETRIC_SIGNING_ALG, privateSigningKey,
                                                                                        this.cryptographicOperations.convertStringToUint8(hashInitData).buffer)
                                                                                        .then((signedHashedInitDataBuf: ArrayBuffer) => {
                                                                                            let signedHashedInitData: string = this.cryptographicOperations
                                                                                                .convertUint8ToString(new Uint8Array(signedHashedInitDataBuf));

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
                                                                                                this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA256', 'encrypt').algorithm,
                                                                                                key,
                                                                                                this.cryptographicOperations.convertStringToBuffer(jsonData))
                                                                                                .then((dataEncryptedBuf: ArrayBuffer) => {
                                                                                                    let dataEncrypted: string = this.cryptographicOperations
                                                                                                        .convertUint8ToString(new Uint8Array(dataEncryptedBuf));
                                                                                                    let hashedDataEncrypted: string = this.cryptographicOperations.hash(dataEncrypted);

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
            );
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

        // Extract own encryption private key
        this.keysService.extractPrivateKey(this.securityProfile.encryptionPair.privateEncrypted, password, this.helper.ASYMMETRIC_ENCRYPTION_ALG)
            .subscribe((privateKey: CryptoKey) => {

                // Extract session key
                this.keysService.extractSessionKey(this.helper
                        .getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                    privateKey).subscribe((sessionKey: CryptoKey) => {

                    // Encrypt message data with session key
                    this.cryptographicOperations.encrypt(this.cryptographicOperations.getAlgorithm(this.helper.SYMMETRIC_ALG,
                        this.helper.HASH_ALG, "encrypt").algorithm, sessionKey, this.cryptographicOperations
                        .convertStringToBuffer(jsonData)).then((encryptedDataBuffer: ArrayBuffer) => {
                        let encryptedData: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(encryptedDataBuffer));
                        let encryptedDataHash = this.cryptographicOperations.hash(encryptedData);

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

        // Construct Simple security profile
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
                this.keysService.extractSessionKey(this.helper
                        .getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                    simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                    // Encrypt the json from the message data with the session key
                    this.cryptographicOperations.encrypt(this.cryptographicOperations
                            .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, "encrypt").algorithm,
                        sessionKey, this.cryptographicOperations.convertStringToUint8(jsonData).buffer)
                        .then((dataEncryptedBuf: ArrayBuffer) => {
                            let dataEncrypted: string = this.cryptographicOperations
                                .convertUint8ToString(new Uint8Array(dataEncryptedBuf));

                            // Hash the json from the message data
                            let hashedData: string = this.cryptographicOperations.hash(jsonData);

                            // Sign the hash
                            this.cryptographicOperations.sign(this.helper.ASYMMETRIC_SIGNING_ALG,
                                simpleProfile.privateKeySigning,
                                this.cryptographicOperations.convertStringToUint8(hashedData).buffer)
                                .then((signedHashedDataBuf: ArrayBuffer) => {
                                    let signedHashedData: string = this.cryptographicOperations
                                        .convertUint8ToString(new Uint8Array(signedHashedDataBuf));
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
