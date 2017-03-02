import {BaseEntityImpl} from "../base-entity-impl";
/**
 * Created by Viki on 2/26/2017.
 */


export class EncryptionPair extends BaseEntityImpl {
  public privateEncrypted: string;
  public publicPem: string;
}
