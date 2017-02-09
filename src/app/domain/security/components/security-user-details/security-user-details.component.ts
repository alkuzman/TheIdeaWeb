import {Component} from "@angular/core";
import {KeysGenerationService} from "../../../../core/security-protocols/keys/keys-generation.service";
import {CertificateService} from "../../../../core/security-protocols/services/certificate.service";
import {CertificateRequestGenerationService} from "../../../../core/security-protocols/certificates/certificates-requests-generation.service";
import {Observable} from "rxjs";
import {CryptographicOperations} from "../../../../core/security-protocols/cryptographic-operations/cryptographic-operations";
/**
 * Created by Viki on 2/6/2017.
 */

var encoding = require("text-encoding");
var arrayBufferToBuffer = require("arraybuffer-to-buffer");

@Component({
  moduleId: module.id,
  selector: "ideal-security-user-details",
  templateUrl: "security-user-details.component.html"
})
export class SecurityUserDetailsComponent {

  constructor(private keysGenerationService: KeysGenerationService,
              private certificateService: CertificateService,
              private certificateRequestGenerationService: CertificateRequestGenerationService,
              private cryptographicOperations: CryptographicOperations) {

  }

  public certificationRequest() {
    let publicKey: CryptoKey;
    let privateKey: CryptoKey;
    this.keysGenerationService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      privateKey = keyPair.privateKey;
      let sequence: Promise<any> = this.certificateRequestGenerationService
        .createPKCS10Internal(privateKey, publicKey);
      sequence
        .then((pkcs10Buffer) => this.certificateRequestGenerationService.parsePEM(pkcs10Buffer),
          error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`))
        .then((pemRequest: string) => this.certificateService.sign(pemRequest),
          error => Promise.reject(`Error parsing PKCS#10 into PEM: ${error}`))
        .then((observable: Observable<any>) => observable.subscribe((result: string) =>
          this.createSecurityProfile(result, privateKey, 'Viki')));
    })
  }

  private createSecurityProfile(certificate: string, privateKey: CryptoKey, passphrase: string) {
    let keyarray = this.keysGenerationService.generateSymmetricKeyFromPassword(passphrase);
    this.keysGenerationService.importKey(keyarray, 'raw').then((key: CryptoKey) => {
      this.keysGenerationService.exportKey(privateKey, 'pkcs8').then((rawkey: ArrayBuffer) => {
        console.log("Private key:");
        console.log(rawkey);
        let array = new Uint8Array(rawkey);
        console.log(array);
        //let decoded = new encoding.TextDecoder('utf-8').decode(rawkey);
        //console.log("Decoded private key:")
        //console.log(decoded);
        this.cryptographicOperations.encrypt(
          this.cryptographicOperations.getAlgorithm('AES-CBC', 'SHA-256', 'encrypt').algorithm,
          key, rawkey).then((ciphertext) => {
          console.log("Encrypted private key:");
          let cipherarray = new Uint8Array(ciphertext);
          console.log(ciphertext);
          //let decoded = new encoding.TextDecoder('utf-8').decode(ciphertext);
          //console.log("Decoded encrypted private key:");
          //console.log(decoded);
          //let encoded = new encoding.TextEncoder('utf-8').encode(decoded);
          //console.log("Encoded encrypted private key:")
          //console.log(encoded);
          this.cryptographicOperations.decrpt(
            this.cryptographicOperations.getAlgorithm('AES-CBC', 'SHA-256', 'decrypt').algorithm,
            key, ciphertext).then((result: ArrayBuffer) => {
            console.log("Decrypted private key:");
            console.log(result);
            let array = new Uint8Array(result);
            console.log(array);
            let decoded = new encoding.TextDecoder('utf-8').decode(result);
            //console.log("PET: " + decoded);
            this.keysGenerationService.importKey(decoded, 'pkcs8').then((decryptedPrivateKey: CryptoKey) => {
              console.log(privateKey);
              console.log(decryptedPrivateKey);
              if (privateKey === decryptedPrivateKey) {
                console.log("ISTI SE");
              }
            });
          });
          //console.log(String.fromCharCode.apply(null, new Uint32Array(ciphertext)));
        });
      });
    });
  }

  private toBuffer(ab): Buffer {
    let buf = new Buffer(ab.byteLength);
    let view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
  }
}
