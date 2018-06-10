/**
 * Created by Viki on 2/5/2017.
 */

import {Injectable} from '@angular/core';
import CertificationRequest from 'pkijs/src/CertificationRequest';
import AttributeTypeAndValue from 'pkijs/src/AttributeTypeAndValue';
import * as asn1js from 'asn1js';
import {getCrypto} from 'pkijs/src/common';
import Extension from 'pkijs/src/Extension';
import Attribute from 'pkijs/src/Attribute';
import {User} from '../../../domain/model/authentication';
import {CountryService} from '../../../domain/services/localization/country.service';
import {SimpleCryptographicOperations} from '../cryptographic-operations/simple-cryptographic-operations';


@Injectable()
export class UserCertificationService {
  private hashAlg = 'sha-256';

  constructor(private countryService: CountryService, private simpleCryptographicOperations: SimpleCryptographicOperations) {
  }

  /**
   * Create certification request for given key pair and user data
   * @param {CryptoKey} privateKey
   * @param {CryptoKey} publicKey
   * @param {User} user
   * @returns {any}
   */
  public createPKCS10Internal(privateKey: CryptoKey, publicKey: CryptoKey, user: User) {
    // region Initial variables
    let sequence: Promise<any> = Promise.resolve();


    const pkcs10 = new CertificationRequest();

    // endregion

    // region Get a "crypto" extension
    const crypto = getCrypto();
    if (typeof crypto === 'undefined') {
      return Promise.reject('No WebCrypto extension found');
    }
    // endregion

    // region Put a static values
    pkcs10.version = 0;
    // common name
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.3',
      value: new asn1js.Utf8String({value: this.simpleCryptographicOperations.hash(user.email)})
    }));
    // country code
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.6',
      value: new asn1js.PrintableString({value: this.countryService.getMapCountriesToCodes()[user.country]})
    }));
    // state or province name
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.8',
      value: new asn1js.PrintableString({value: user.country})
    }));


    pkcs10.attributes = [];
    // endregion

    // region Exporting public key into "subjectPublicKeyInfo" value of PKCS#10
    sequence = sequence.then(() => pkcs10.subjectPublicKeyInfo.importKey(publicKey));
    // endregion

    // region SubjectKeyIdentifier
    sequence = sequence.then(() => crypto.digest({name: 'SHA-1'}, pkcs10.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex))
      .then(result => {
          pkcs10.attributes.push(new Attribute({
            type: '1.2.840.113549.1.9.14', // pkcs-9-at-extensionRequest
            values: [(new Extension({
              extensionsArray: [
                new Extension({
                  extnID: '2.5.29.14',
                  critical: false,
                  extnValue: (new asn1js.OctetString({valueHex: result})).toBER(false)
                })
              ]
            })).toSchema()]
          }));
        }
      );
    // endregion

    // region Signing final PKCS#10 request
    sequence = sequence.then(() => pkcs10.sign(privateKey, this.hashAlg), error =>
      Promise.reject(`Error during exporting public key: ${error}`));
    // endregion

    return sequence.then(() => {
      let pkcs10Buffer = new ArrayBuffer(0);
      pkcs10Buffer = pkcs10.toSchema().toBER(false);
      return pkcs10Buffer;

    }, error => Promise.reject(`Error signing PKCS#10: ${error}`));
  }

}
