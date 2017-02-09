import {BaseEntityImpl} from "../base-entity-impl";
/**
 * Created by Viki on 2/7/2017.
 */


export class SecurityProfile extends BaseEntityImpl {
  public certificatePEM: string;
  public encryptedPrivateKey: string;
}
