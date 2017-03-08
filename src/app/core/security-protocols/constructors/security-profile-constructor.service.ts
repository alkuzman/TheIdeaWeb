import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {User} from "../../../domain/model/authentication/user";
import {CertificateType} from "../../../domain/model/enumerations/certificate-type";
import {EncryptionPair} from "../../../domain/model/security/encryption-pair";
/**
 * Created by Viki on 2/12/2017.
 */

@Injectable()
export class SecurityProfileConstructorService {

  constructor() {
  }

  public createSecurityProfile(certificationRequestPEM: string, certificatePEM: string, privateKeyEncrypted: string,
                               type: CertificateType, user: User, encryptionPair: EncryptionPair): SecurityProfile {

    let securityProfile: SecurityProfile = new SecurityProfile();

    securityProfile.certificationRequestPEM = certificationRequestPEM;
    securityProfile.certificatePEM = certificatePEM;
    securityProfile.certificateType = type;
    securityProfile.agent = user
    securityProfile.encryptionPair = encryptionPair;
    if (privateKeyEncrypted !== undefined) {
      securityProfile.encryptedPrivateKey = privateKeyEncrypted;
    }
    return securityProfile;
  }
}
