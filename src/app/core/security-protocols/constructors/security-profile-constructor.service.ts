import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {User} from "../../../domain/model/authentication/user";
import {CertificateType} from "../../../domain/model/enumerations/certificate-type";
/**
 * Created by Viki on 2/12/2017.
 */

@Injectable()
export class SecurityProfileConstructorService {

  constructor() {
  }

  /*
  public createSecurityProfile2(certificatePEM: string, privateKey: CryptoKey, passphrase: string, user: User) {
    let keyArray = this.keysGenerationService.generateSymmetricKeyFromPassword(passphrase, 6530, 32, 'SHA256');
    this.keysGenerationService.importKey(keyArray, 'raw', 'AES-CTR').then((symmetricKey: CryptoKey) => {
      this.keysGenerationService.exportKey(privateKey, 'pkcs8').then((privateRawKey: ArrayBuffer) => {
        console.log(new Uint8Array(privateRawKey));
        this.cryptographicOperations.encrypt(
          this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA-256', 'encrypt').algorithm,
          symmetricKey, privateRawKey).then((ciphertext: ArrayBuffer) => {
          let cipherArray: Uint8Array = new Uint8Array(ciphertext);
          let encodedCipher: string = this.cryptographicOperations.convertUint8ToString(cipherArray);
          let securityProfile: SecurityProfile = new SecurityProfile();
          securityProfile.certificatePEM = certificatePEM;
          securityProfile.encryptedPrivateKey = encodedCipher;
          securityProfile.agent = user;
          this.certificateService.save(securityProfile).subscribe((result: SecurityProfile) => console.log(result));
        });
      });
    });
  }
   */

  public createSecurityProfile(certificationRequestPEM: string, certificatePEM: string, privateKeyEncrypted: string,
                               type: CertificateType, user: User,): SecurityProfile {

    let securityProfile: SecurityProfile = new SecurityProfile();

    securityProfile.certificationRequestPEM = certificationRequestPEM;
    securityProfile.certificatePEM = certificatePEM;
    securityProfile.certificateType = type;
    securityProfile.agent = user;
    if (privateKeyEncrypted !== undefined) {
      securityProfile.encryptedPrivateKey = privateKeyEncrypted;
    }
    return securityProfile;
  }

}
