import {Injectable} from "@angular/core";
/**
 * Created by Viki on 2/10/2017.
 */

@Injectable()
export class HelperService {

  public ASYMMETRIC_SIGNING_ALG: string = 'RSASSA-PKCS1-v1_5';
  public ASYMMETRIC_SIGNING_ALG2: string = 'RSA-PSS';
  public ASYMMETRIC_ENCRYPTION_ALG: string = 'RSA-OAEP';
  public HASH_ALG: string = 'SHA-256';
  public SYMMETRIC_ALG: string = 'AES-CTR';

  public equal(buf1, buf2) {
    if (buf1.byteLength != buf2.byteLength) return false;
    var dv1 = new Uint8Array(buf1);
    var dv2 = new Uint8Array(buf2);
    for (var i = 0; i != buf1.byteLength; i++) {
      if (dv1[i] != dv2[i]) return false;
    }
    return true;
  }
}
