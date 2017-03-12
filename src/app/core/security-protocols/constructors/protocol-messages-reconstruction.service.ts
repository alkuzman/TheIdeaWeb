import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {SecurityContext} from "../../authentication/security.context.service";
import {JwtSecurityContext} from "../../authentication/jwt/jwt-security-context.service";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import {HelperService} from "../helper.service";
import {KeysService} from "../keys/keys.service";
import {ParserPemService} from "../parsers/parser-pem.service";
import {CertificateService} from "../../../domain/services/certificate/certificate.service";
import Certificate from "pkijs/src/Certificate";
import {Price} from "../../../domain/model/helpers/price";
import {PriceRequestPhaseData} from "../../../domain/model/security/data/price-request-phase-data";
import {Observable} from "rxjs";
import {SecurityPasswordDialogComponent} from "../../../domain/security/components/security-password-dialog/security-password-dialog.component";
import {MdDialog} from "@angular/material";
import {ProtocolSession} from "../../../domain/model/security/protocol-session";
import {UserService} from "../../../domain/services/user/user.service";
import {ProtocolParticipantSessionData} from "../../../domain/model/security/protocol-participant-session-data";
/**
 * Created by Viki on 3/1/2017.
 */


@Injectable()
export class ProtocolMessagesReconstructionService {

    private securityProfile: SecurityProfile;

    constructor(private securityContext: JwtSecurityContext, private cryptographicOperations: CryptographicOperations,
                private helper: HelperService, private keysService: KeysService, private pemParser: ParserPemService,
                private certificateService: CertificateService, private userService: UserService) {
        this.initializeSecurityProfile();
    }

    private initializeSecurityProfile() {
        this.securityProfile = this.securityContext.securityProfile;
        this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
            this.securityProfile = securityProfile;
        });
    }

    public constructProtocolMessageOne(jsonMessage: string, password: string,
                                       protocolSession: ProtocolSession): Observable<PriceRequestPhaseData> {

        return Observable.create((observer) => {

            let result: PriceRequestPhaseData = {};
            console.log(jsonMessage);

            let message: {'signature': string, 'object': string, 'data': string, 'hashedData': string} =
                JSON.parse(jsonMessage);
            // Integrity check of the data sent
            if (this.cryptographicOperations.hash(message.data) == message.hashedData) {
                // Extracting user private key
                this.keysService.extractPrivateKey(this.securityProfile.encryptionPair.privateEncrypted, password,
                    this.helper.ASYMMETRIC_ENCRYPTION_ALG).subscribe((privateKey: CryptoKey) => {
                    // Decrypting object
                    this.cryptographicOperations.decrypt(this.cryptographicOperations.getAlgorithm(
                        this.helper.ASYMMETRIC_ENCRYPTION_ALG, this.helper.HASH_ALG, "decrypt").algorithm,
                        privateKey, this.cryptographicOperations.convertStringToUint8(message.object).buffer)
                        .then((jsonObjectBuffer: ArrayBuffer) => {
                            // Parse decrypted object in JSON
                            let jsonObject = this.cryptographicOperations.convertBufferToString(Buffer.from(jsonObjectBuffer));
                            let object: {key: string, nonce: number, identity: string} = JSON.parse(jsonObject);
                            result.nonce = object.nonce;
                            result.otherParty = object.identity;
                            // Get other party certificate to verify the signature
                            this.certificateService.get({email: object.identity})
                                .subscribe((otherPartyCertificatePEM: string) => {
                                    let certificate: Certificate = this.pemParser
                                        .parseCertificateFromPem(otherPartyCertificatePEM);
                                    // Extract public key from certificate
                                    certificate.getPublicKey().then((otherPartyPublicKey: CryptoKey) => {
                                        // Verify other party signature
                                        this.cryptographicOperations.verify(this.helper.ASYMMETRIC_SIGNING_ALG,
                                            otherPartyPublicKey,
                                            this.cryptographicOperations.convertStringToUint8(message.signature).buffer,
                                            this.cryptographicOperations.convertStringToUint8(this
                                                .cryptographicOperations.hash(jsonObject)).buffer)
                                            .then((verifyResult: boolean) => {
                                                if (verifyResult) {
                                                    // Import session key from string into CryptoKey
                                                    this.keysService.importKey(this.cryptographicOperations
                                                        .convertStringToUint8(object.key).buffer, 'raw', this.helper.SYMMETRIC_ALG)
                                                        .then((sessionKey: CryptoKey) => {
                                                            result.key = sessionKey;
                                                            // Add the session key encrypted into protocol session
                                                            this.pemParser.parsePublicKeyFromPem(this.securityProfile.encryptionPair.publicPem)
                                                                .subscribe((encryptionPublicKey: CryptoKey) => {

                                                                    // Decrypt data sent with session key
                                                                    this.cryptographicOperations.decrypt(this.cryptographicOperations
                                                                            .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG,
                                                                                'decrypt').algorithm, sessionKey,
                                                                        this.cryptographicOperations.convertStringToUint8(message.data).buffer)
                                                                        .then((decryptedDataBuf: ArrayBuffer) => {
                                                                            let jsonData: string = this.cryptographicOperations.convertBufferToString(Buffer.from(decryptedDataBuf));
                                                                            let data: {bid: Price} = JSON.parse(jsonData);
                                                                            result.price = data.bid;
                                                                            observer.next(result);
                                                                        });
                                                                });
                                                        });

                                                } else {
                                                    console.log("signature is not valid");
                                                }
                                            });
                                    });
                                });
                        });
                });

            }
        });


    }

    public constructProtocolMessageTwo(jsonMessage: string, password: string,
                                       protocolSession: ProtocolSession): Observable<PriceRequestPhaseData> {

        return Observable.create((observer) => {
            console.log(jsonMessage);
            // Parse the json string into an object
            let message: {data: string, hashedData: string} = JSON.parse(jsonMessage);
            // Integrity check of the data send
            if (this.cryptographicOperations.hash(message.data) == message.hashedData) {
                let encryptedSessionKey: string = "";
                for (let participant of protocolSession.participantsSessionData) {
                    if (participant.participant.email == this.userService.getAuthenticatedUser().email) {
                        encryptedSessionKey = participant.sessionKeyEncrypted;
                        break;
                    }
                }
                this.keysService.extractPrivateKey(this.securityProfile.encryptionPair.privateEncrypted, password,
                    this.helper.ASYMMETRIC_ENCRYPTION_ALG)
                    .subscribe((privateEncryptionKey: CryptoKey) => {
                        this.keysService.extractSessionKey(encryptedSessionKey, privateEncryptionKey)
                            .subscribe((sessionKey: CryptoKey) => {
                                this.cryptographicOperations.decrypt(this.cryptographicOperations
                                        .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, "decrypt").algorithm,
                                    sessionKey, this.cryptographicOperations.convertStringToUint8(message.data).buffer)
                                    .then((decryptedDataBuf: ArrayBuffer) => {
                                        let decryptedDataJson: string = this.cryptographicOperations.convertBufferToString(Buffer.from(decryptedDataBuf));
                                        let decryptedData: {price: Price} = JSON.parse(decryptedDataJson);
                                        let result: PriceRequestPhaseData = {};
                                        result.price = decryptedData.price;
                                        observer.next(result);
                                    });
                            });
                    });
            }
        });
    }
}
