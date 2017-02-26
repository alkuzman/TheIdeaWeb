import {Injectable} from "@angular/core";
import Certificate from "pkijs/src/Certificate";
import {arrayBufferToString, toBase64} from "pvutils";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import * as asn1js from "asn1js";
import {KeysService} from "../keys/keys.service";
import {HelperService} from "../helper.service";
import {Observable} from "rxjs";

/**
 * Created by Viki on 2/26/2017.
 */


@Injectable()
export class ParserPemService {

  constructor(private cryptographicOperations: CryptographicOperations,
              private keysService: KeysService, private helper: HelperService) {

  }

  public parseCertificateRequestPEM(pkcs10Buffer): string {
    let resultString: string = "-----BEGIN CERTIFICATE REQUEST-----\r\n";
    resultString = `${resultString}${this.formatPEM(toBase64(arrayBufferToString(pkcs10Buffer)))}`;
    resultString = `${resultString}\r\n-----END CERTIFICATE REQUEST-----\r\n`;
    return resultString;
  }

  public parsePrivateKeyPEM(pkcs8Buffer): string {
    let resultString: string = "-----BEGIN PRIVATE KEY-----\r\n";
    resultString = `${resultString}${this.formatPEM(toBase64(arrayBufferToString(pkcs8Buffer)))}`;
    resultString = `${resultString}\r\n-----END PRIVATE KEY-----\r\n`;
    return resultString;
  }

  public parsePublicKeyPEM(pubKeyBuffer): string {
    let resultString: string = "-----BEGIN PUBLIC KEY-----\r\n";
    resultString = `${resultString}${this.formatPEM(toBase64(arrayBufferToString(pubKeyBuffer)))}`;
    resultString = `${resultString}\r\n-----END PUBLIC KEY-----\r\n`;
    return resultString;
  }

  public parseEncryptedPrivateKeyPEM(epkeyBuffer): string {
    let resultString: string = "-----BEGIN ENCRYPTED PRIVATE KEY-----\r\n";
    resultString = `${resultString}${this.formatPEM(toBase64(arrayBufferToString(epkeyBuffer)))}`;
    resultString = `${resultString}\r\n-----END ENCRYPTED PRIVATE KEY-----\r\n`;
    return resultString;
  }

  private formatPEM(pemString): string {
    /// <summary>Format string in order to have each line with length equal to 63</summary>
    /// <param name="pemString" type="String">String to format</param>

    const stringLength = pemString.length;
    let resultString = "";

    for (let i = 0, count = 0; i < stringLength; i++, count++) {
      if (count > 63) {
        resultString = `${resultString}\r\n`;
        count = 0;
      }

      resultString = `${resultString}${pemString[i]}`;
    }

    return resultString;
  }

  public parseCertificateFromPem(certPEM: string): Certificate {
    certPEM = certPEM.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
    let certBuf: ArrayBuffer = this.cryptographicOperations.convertStringToUint8(certPEM).buffer;
    let certAsn1 = asn1js.fromBER(certBuf);
    let certificate: Certificate = new Certificate({schema: certAsn1.result});
    return certificate;
  }

  public parsePublicKeyFromPem(publicKeyPEM: string): Observable<CryptoKey> {
    publicKeyPEM = publicKeyPEM.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\n)/g, '');
    let pubKeyBuf: ArrayBuffer = this.cryptographicOperations.convertStringToUint8(publicKeyPEM).buffer;
    return Observable.create((observer) => {
      this.keysService.importKey(pubKeyBuf, 'spki', this.helper.ASYMMETRIC_ENCRYPTION_ALG)
        .then((key: CryptoKey) => {
          observer.next(key);
        });
    });
  }
}
