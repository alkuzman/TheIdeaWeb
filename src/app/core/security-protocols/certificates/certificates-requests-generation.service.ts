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
import {User} from "../../../domain/model/authentication/user";
import {CountryService} from "../../../domain/services/localization/country.service";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import Certificate from "pkijs/src/Certificate";


@Injectable()
export class CertificateRequestGenerationService {
  private signAlg: string = "RSA-PSS";
  private hashAlg: string = "sha-256";

  constructor(private countryService: CountryService, private cryptographicOperations: CryptographicOperations) {
  }

  public createPKCS10Internal(privateKey: CryptoKey, publicKey: CryptoKey, user: User) {
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
    //common name
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: "2.5.4.3",
      value: new asn1js.Utf8String({value: this.cryptographicOperations.hash(user.email)})
    }));
    //country code
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: "2.5.4.6",
      value: new asn1js.PrintableString({value: this.countryService.getMapCountriesToCodes()[user.country]})
    }));
    //state or province name
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: "2.5.4.8",
      value: new asn1js.PrintableString({value: user.country})
    }));


    pkcs10.attributes = [];
    //endregion

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

    let forSigning: boolean = false;
    console.log(privateKey.usages);
    for (let index in privateKey.usages) {
      console.log(privateKey.usages[index]);
      if (privateKey.usages[index] == 'sign') {
        forSigning = true;
      }
    }

    console.log(forSigning);
    console.log("after create3");
    //if (forSigning) {
    console.log("In If");
    //region Signing final PKCS#10 request
    sequence = sequence.then(() => pkcs10.sign(privateKey, this.hashAlg), error => Promise.reject(`Error during exporting public key: ${error}`));
    //endregion
    //}

    console.log("in create4");
    return sequence.then(() => {
      console.log("in create5");
      let pkcs10Buffer = new ArrayBuffer(0);
      pkcs10Buffer = pkcs10.toSchema().toBER(false);
      console.log("in create6");
      return pkcs10Buffer;

    }, error => Promise.reject(`Error signing PKCS#10: ${error}`));
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

  public parseCertficiateFromPem(certPEM: string): Certificate {
    certPEM = certPEM.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
    let certBuf: ArrayBuffer = this.cryptographicOperations.convertStringToUint8(certPEM).buffer;
    let certAsn1 = asn1js.fromBER(certBuf);
    let certificate: Certificate = new Certificate({schema: certAsn1.result});
    return certificate;
  }

}
