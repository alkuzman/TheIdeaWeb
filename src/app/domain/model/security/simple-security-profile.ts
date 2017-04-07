import Certificate from "pkijs/src/Certificate";
import {BaseEntityImpl} from "../base-entity-impl";
/**
 * Created by Viki on 3/13/2017.
 */


export class SimpleSecurityProfile {
    public certificate: Certificate;
    public publicKey: CryptoKey;
    public privateKeyEncryption: CryptoKey;
    public privateKeySigning: CryptoKey;
    public symmetricKey: CryptoKey;
}