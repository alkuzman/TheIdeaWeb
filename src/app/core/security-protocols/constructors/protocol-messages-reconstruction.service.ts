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
/**
 * Created by Viki on 3/1/2017.
 */


@Injectable()
export class ProtocolMessagesReconstructionService {

    private securityProfile: SecurityProfile;

    constructor(private securityContext: JwtSecurityContext, private cryptographicOperations: CryptographicOperations,
                private helper: HelperService, private keysService: KeysService, private pemParser: ParserPemService,
                private certificateService: CertificateService) {
        this.initializeSecurityProfile();
    }

    private initializeSecurityProfile() {
        this.securityProfile = this.securityContext.securityProfile;
        this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
            this.securityProfile = securityProfile;
        });
    }

    public constructProtocolMessageOne(jsonMessage: string) {

        //this.try();


        let message: {'signature': string, 'object': string, 'data': string, 'hashedData': string} =
            JSON.parse(jsonMessage);
        // Integrity check of the data sent
        if (this.cryptographicOperations.hash(message.data) == message.hashedData) {
            // Extracting user private key
            this.keysService.extractPrivateKey(this.securityProfile.encryptionPair.privateEncrypted, 'viki',
                this.helper.ASYMMETRIC_ENCRYPTION_ALG).subscribe((privateKey: CryptoKey) => {
                // Decrypting object
                this.cryptographicOperations.decrypt(this.cryptographicOperations.getAlgorithm(
                    this.helper.ASYMMETRIC_ENCRYPTION_ALG, this.helper.HASH_ALG, "decrypt").algorithm,
                    privateKey, this.cryptographicOperations.convertStringToUint8(message.object).buffer)
                    .then((jsonObjectBuffer: ArrayBuffer) => {
                        // Parse decrypted object in JSON
                        let jsonObject = this.cryptographicOperations.convertBufferToString(Buffer.from(jsonObjectBuffer));
                        let object: {key: string, nonce: number, identity: string} = JSON.parse(jsonObject);
                        console.log(object);
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
                                                        // Decrypt data sent with session key
                                                        this.cryptographicOperations.decrypt(this.cryptographicOperations
                                                                .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG,
                                                                    'decrypt').algorithm, sessionKey,
                                                            this.cryptographicOperations.convertStringToUint8(message.data).buffer)
                                                            .then((decryptedDataBuf: ArrayBuffer) => {
                                                                let jsonData: string = this.cryptographicOperations.convertBufferToString(Buffer.from(decryptedDataBuf));
                                                                let data: {bid: Price} = JSON.parse(jsonData);
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
    }

    private try() {
        let data: string = "viki";

        this.pemParser.parsePublicKeyFromPem(this.securityProfile.encryptionPair.publicPem)
            .subscribe((publicKey: CryptoKey) => {
                this.cryptographicOperations.encrypt(this.cryptographicOperations
                        .getAlgorithm(this.helper.ASYMMETRIC_ENCRYPTION_ALG, this.helper.HASH_ALG, "encrypt").algorithm,
                    publicKey, this.cryptographicOperations.convertStringToUint8(data).buffer)
                    .then((encBuf: ArrayBuffer) => {
                        console.log("Enc");
                        let enc = this.cryptographicOperations.convertUint8ToString(new Uint8Array(encBuf));
                        console.log(enc);
                        this.keysService.extractPrivateKey(this.securityProfile.encryptionPair.privateEncrypted, 'viki',
                            this.helper.ASYMMETRIC_ENCRYPTION_ALG).subscribe((privateKey: CryptoKey) => {
                            console.log("after extraction");
                            this.cryptographicOperations.decrypt(this.cryptographicOperations
                                    .getAlgorithm(this.helper.ASYMMETRIC_ENCRYPTION_ALG, this.helper.HASH_ALG,
                                        "decrypt").algorithm, privateKey,
                                this.cryptographicOperations.convertStringToUint8(enc).buffer)
                                .then((decBuf: ArrayBuffer) => {
                                    console.log("after decryption");
                                    let plain: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(decBuf));
                                    console.log(plain);
                                });
                        });
                    });

            });
    }
}
