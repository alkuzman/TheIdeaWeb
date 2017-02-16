import {BaseEntityImpl} from "../base-entity-impl";
import {Agent} from "../authentication/agent";
import {CertificateType} from "../enumerations/certificate-type";
/**
 * Created by Viki on 2/7/2017.
 */


export class SecurityProfile extends BaseEntityImpl {
  public certificationRequestPEM: string;
  public certificatePEM: string;
  public encryptedPrivateKey: string;
  public certificateType: CertificateType;
  public agent: Agent;
}
