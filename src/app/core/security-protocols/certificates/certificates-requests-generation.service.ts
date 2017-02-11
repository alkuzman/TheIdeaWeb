/**
 * Created by Viki on 2/5/2017.
 */

import {Injectable} from "@angular/core";
import CertificationRequest from "pkijs/src/CertificationRequest";
import AttributeTypeAndValue from "pkijs/src/AttributeTypeAndValue";
import {arrayBufferToString, toBase64} from "pvutils";
import * as asn1js from "asn1js";
import {getCrypto} from "pkijs/src/common";
import Extension from "pkijs/src/Extension";
import Attribute from "pkijs/src/Attribute";


@Injectable()
export class CertificateRequestGenerationService {
  private signAlg: string = "RSA-PSS";
  private hashAlg: string = "sha-256";

  constructor() {
  }

  public createPKCS10Internal(privateKey: CryptoKey, publicKey: CryptoKey) {
    //region Initial variables
    let sequence: Promise<any> = Promise.resolve();

    const pkcs10 = new CertificationRequest();

    //endregion

    //region Get a "crypto" extension
    const crypto = getCrypto();
    if (typeof crypto === "undefined")
      return Promise.reject("No WebCrypto extension found");
    //endregion

    //region Put a static values
    pkcs10.version = 0;
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: "2.5.4.6",
      value: new asn1js.PrintableString({value: "RU"})
    }));
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: "2.5.4.3",
      value: new asn1js.Utf8String({value: "Simple test (простой тест)"})
    }));

    pkcs10.attributes = [];
    //endregion

    /*
     //region Create a new key pair
     sequence = sequence.then(() =>
     {
     let algorithm = getAlgorithmParameters(this.signAlg, "generatekey");
     let algorithmInstTemp: any = algorithm.algorithm;
     if ("hash" in algorithm.algorithm) {
     algorithmInstTemp.hash.name = this.hashAlg;
     }

     return crypto.generateKey(algorithmInstTemp, true, algorithm.usages);
     }
     );
     //endregion

     //region Store new key in an interim variables
     sequence = sequence.then((keyPair: CryptoKeyPair) =>
     {
     publicKey = keyPair.publicKey;
     privateKey = keyPair.privateKey;
     },
     error => Promise.reject((`Error during key generation: ${error}`))
     );
     //endregion
     */

    //region Exporting public key into "subjectPublicKeyInfo" value of PKCS#10
    sequence = sequence.then(() => pkcs10.subjectPublicKeyInfo.importKey(publicKey));
    //endregion

    //region SubjectKeyIdentifier
    sequence = sequence.then(() => crypto.digest({name: "SHA-1"}, pkcs10.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex))
      .then(result => {
          pkcs10.attributes.push(new Attribute({
            type: "1.2.840.113549.1.9.14", // pkcs-9-at-extensionRequest
            values: [(new Extension({
              extensionsArray: [
                new Extension({
                  extnID: "2.5.29.14",
                  critical: false,
                  extnValue: (new asn1js.OctetString({valueHex: result})).toBER(false)
                })
              ]
            })).toSchema()]
          }));
        }
      );
    //endregion

    //region Signing final PKCS#10 request
    sequence = sequence.then(() => pkcs10.sign(privateKey, this.hashAlg), error => Promise.reject(`Error during exporting public key: ${error}`));
    //endregion

    return sequence.then(() => {
      let pkcs10Buffer = new ArrayBuffer(0);
      pkcs10Buffer = pkcs10.toSchema().toBER(false);
      return pkcs10Buffer;

    }, error => Promise.reject(`Error signing PKCS#10: ${error}`));
  }

  public parsePEM(pkcs10Buffer): string {
    let resultString: string = "-----BEGIN CERTIFICATE REQUEST-----\r\n";
    resultString = `${resultString}${this.formatPEM(toBase64(arrayBufferToString(pkcs10Buffer)))}`;
    resultString = `${resultString}\r\n-----END CERTIFICATE REQUEST-----\r\n`;
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

}