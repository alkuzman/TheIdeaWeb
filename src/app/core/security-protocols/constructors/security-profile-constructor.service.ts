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
