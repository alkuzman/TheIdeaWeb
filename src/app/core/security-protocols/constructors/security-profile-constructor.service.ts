import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {User} from "../../../domain/model/authentication/user";
import {CertificateType} from "../../../domain/model/enumerations/certificate-type";
import {EncryptionPair} from "../../../domain/model/security/encryption-pair";
import {SimpleSecurityProfile} from "../../../domain/model/security/simple-security-profile";
import {Observable} from "rxjs";
import {KeysService} from "../keys/keys.service";
import {ParserPemService} from "../parsers/parser-pem.service";
import {HelperService} from "../helper.service";
import {AlgorithmService} from "../algorithms/algorithms.service";
/**
 * Created by Viki on 2/12/2017.
 */

@Injectable()
export class SecurityProfileConstructorService {

    constructor(private keysService: KeysService, private pemParser: ParserPemService,
                private algorithmService: AlgorithmService) {
    }

    public createSecurityProfile(certificationRequestPEM: string, certificatePEM: string, privateKeyEncrypted: string,
                                 type: CertificateType, user: User, encryptionPair: EncryptionPair,
                                 encryptedSessionKey: string): SecurityProfile {

        let securityProfile: SecurityProfile = new SecurityProfile();

        securityProfile.certificationRequestPEM = certificationRequestPEM;
        securityProfile.certificatePEM = certificatePEM;
        securityProfile.encryptedSymmetricKey = encryptedSessionKey;
        securityProfile.certificateType = type;
        securityProfile.agent = user;
        securityProfile.encryptionPair = encryptionPair;
        if (privateKeyEncrypted !== undefined) {
            securityProfile.encryptedPrivateKey = privateKeyEncrypted;
        }
        return securityProfile;
    }

    public getSecurityProfileSimple(password: string, securityProfile: SecurityProfile): Observable<SimpleSecurityProfile> {
        return Observable.create((observer) => {

            console.log("in simple profile");

            // Initialize result
            let result: SimpleSecurityProfile = new SimpleSecurityProfile();

            // Initialize certificate
            result.certificate = this.pemParser.parseCertificateFromPem(securityProfile.certificatePEM);

            console.log("certificate");

            // Initialize encryption public key
            this.pemParser.parsePublicKeyFromPem(securityProfile.encryptionPair.publicPem)
                .subscribe((publicKey: CryptoKey) => {
                    result.publicKey = publicKey;

                    console.log("after public");

                    // Initialize encryption private key
                    this.keysService.extractPrivateKey(securityProfile.encryptionPair.privateEncrypted,
                        password, this.algorithmService.ASYMMETRIC_ENCRYPTION_ALG).subscribe((privateKeyEncryption) => {
                        result.privateKeyEncryption = privateKeyEncryption;

                        console.log("after private encryption");

                        // Initialize signing private key
                        this.keysService.extractPrivateKey(securityProfile.encryptedPrivateKey, password,
                            this.algorithmService.ASYMMETRIC_SIGNING_ALG).subscribe((privateKeySigning: CryptoKey) => {
                            result.privateKeySigning = privateKeySigning;

                            // Initialize symmetric key
                            this.keysService.decryptSymmetricKeyWithPasswordKey(securityProfile
                                .encryptedSymmetricKey, password).subscribe((symmetricKey: CryptoKey) => {
                                result.symmetricKey = symmetricKey;
                                observer.next(result);
                            });
                        });
                    });
                });
        });

    }
}
