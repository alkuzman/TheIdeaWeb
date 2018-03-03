

import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../domain/model/security/security-profile";
import {SecurityContext} from "../authentication/security.context.service";
import {SecurityProfileConstructorService} from "./constructors/security-profile-constructor.service";
import {SimpleSecurityProfile} from "../../domain/model/security/simple-security-profile";
import {CryptographicOperations} from "./cryptographic-operations/cryptographic-operations";
import {AlgorithmService} from "./algorithms/algorithms.service";
import {TestProtocolTransactionService} from "../../domain/services/protocol-transaction/test-protocol-transaction.service";
import {ProtocolTransactionService} from "../../domain/services/protocol-transaction/protocol-transaction.service";
import {UserService} from "../../domain/services/user/user.service";
import {KeysService} from "./keys/keys.service";
import {SimpleCryptographicOperations} from "./cryptographic-operations/simple-cryptographic-operations";
import {JwtSecurityContext} from "../authentication/jwt/jwt-security-context.service";
import {CertificateService} from "../../domain/services/certificate/certificate.service";
import {ParserPemService} from "./parsers/parser-pem.service";
import Certificate from "pkijs/src/Certificate";

@Injectable()
export class MyTesterService {

    private securityProfile: SecurityProfile;

    constructor(private securityContext: JwtSecurityContext,
                private securityProfileConstructor: SecurityProfileConstructorService,
                private cryptographicOperations: CryptographicOperations,
                private algorithmService: AlgorithmService,
                private testProtocolTransactionService: TestProtocolTransactionService,
                private protocolTransactionService: ProtocolTransactionService,
                private userService: UserService,
                private keyService: KeysService,
                private simpleOperations: SimpleCryptographicOperations,
                private certificateService: CertificateService,
                private pemParser: ParserPemService) {
        this.initializeSecurityProfile();
    }

    private initializeSecurityProfile(): void {
        this.securityProfile = this.securityContext.securityProfile;
        this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
            this.securityProfile = securityProfile;
        });
    }


    testEncryptionHereDecryptionServerSide(password: string) {

        // Construct simple security profile
        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
            .subscribe((simpleProfile: SimpleSecurityProfile) => {

                // Get shared with server session key
                this.protocolTransactionService.getSessionKeyWithServer(this.userService.getAuthenticatedUser().email)
                    .subscribe((sessionKey: string) => {

                        // Import key
                        this.keyService.importKey(sessionKey, "raw", this.algorithmService.SYMMETRIC_ALG)
                            .subscribe((key: CryptoKey) => {



                                const alg: AesCtrParams = {
                                    counter: this.simpleOperations.getRandomArrayBuffer(16),
                                    length: 117,
                                    name: this.algorithmService.SYMMETRIC_ALG
                                };

                                console.log(new Uint8Array(<ArrayBuffer> alg.counter));

                                // Encrypt
                                this.cryptographicOperations.encrypt(alg, key, "viki")
                                    .subscribe((encryptedText: string) => {

                                        const data = {
                                            text: encryptedText,
                                            iv: this.simpleOperations.convertUint8ToString(new Uint8Array(<ArrayBuffer> alg.counter))
                                        };

                                        console.log(data);

                                        //Decrypt server side
                                        this.testProtocolTransactionService.sendForDecryption(JSON.stringify(data))
                                            .subscribe((text: string) => {
                                                console.log(text);
                                            });
                                    });
                            });
                    });
            });
    }

    testAsynchronousEncryptionDecryption(password: string) {
        // Construct simple security profile
        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
            .subscribe((simpleProfile: SimpleSecurityProfile) => {

                console.log(this.algorithmService.getAsymmetricEncryptionAlgorithm());
                // Encrypt with user public key

                let alg: RsaOaepParams = {
                    name: this.algorithmService.getAsymmetricEncryptionAlgorithm().algorithm.name,
                    label: this.simpleOperations.convertStringToBuffer("label")
                };
                console.log(alg.label);
                this.cryptographicOperations.encrypt(this.algorithmService.getAsymmetricEncryptionAlgorithm().algorithm,
                    simpleProfile.publicKey, "viki").subscribe((encryptedData: string) => {

                    // Export private key for decryption
                    this.keyService.exportKey(simpleProfile.privateKeyEncryption, "pkcs8")
                        .subscribe((privateKey: string) => {

                            // Add the private key for decryption to the message
                            const message = {
                                data: encryptedData,
                                key: privateKey,
                                label: "label"
                            };

                            this.testProtocolTransactionService.sendForAsynchronousDecryption(JSON.stringify(message))
                                .subscribe((decrypted: string) => {

                                    console.log(decrypted);
                                });
                        });
                });
            });
    }

    testDecryptingSessionKey(password: string) {
        // Construct simple security profile
        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
            .subscribe((simpleProfile: SimpleSecurityProfile) => {

                // Get encrypted session key from server
                this.protocolTransactionService.getSessionKeyWithServer(this.userService.getAuthenticatedUser().email)
                    .subscribe((sessionKeyEncrypted: string) => {

                        console.log(sessionKeyEncrypted);

                        // Decrypt session key with private key
                        this.cryptographicOperations.decrypt(this.algorithmService.getAsymmetricDecryptionAlgorithm().algorithm,
                            simpleProfile.privateKeyEncryption, sessionKeyEncrypted).subscribe((decryptedSessionKey: string) => {

                            // Import session key
                            this.keyService.importKey(decryptedSessionKey, "raw", this.algorithmService.SYMMETRIC_ALG)
                                .subscribe((sessionKey: CryptoKey) => {

                                });
                        });
                    });
            });
    }
}