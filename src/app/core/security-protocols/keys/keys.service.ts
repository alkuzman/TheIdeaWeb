import {Injectable} from "@angular/core";
import {getCrypto} from "pkijs/src/common";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import {Observable} from "rxjs";
/**
 * Created by Viki on 2/4/2017.
 */

var pbkdf2 = require('pbkdf2');

@Injectable()
export class KeysService {
  private signAlg: string = "RSA-PSS";
  private hashAlg: string = "SHA-256";
  private crypto: SubtleCrypto;

  constructor(private cryptographicOperations: CryptographicOperations) {
    this.crypto = getCrypto();
  }

  public generatePublicPrivateKeyPair(): PromiseLike<CryptoKeyPair> {
    let algorithm = this.cryptographicOperations.getAlgorithm(this.signAlg, this.hashAlg, "generatekey");
    let algInst: any = algorithm.algorithm
    return this.crypto.generateKey(algInst, true, algorithm.usages);
  }

  public generateSymmetricKeyFromPassword(password: string, numIterations: number, byteLength: number,
                                          algorithm: string): PromiseLike<CryptoKey> {
    let keyArray: Buffer = pbkdf2.pbkdf2Sync(password, 'iDeal', numIterations, byteLength, algorithm);
    return this.importKey(keyArray, 'raw', 'AES-CTR');
  }

  public exportKey(key: CryptoKey, format: string): PromiseLike<JsonWebKey|ArrayBuffer> {
    return this.crypto.exportKey(format, key);
  }

  public importKey(buffer: BufferSource, format: string, algString: string): PromiseLike<CryptoKey> {
    let algorithm = this.cryptographicOperations.getAlgorithm(algString, this.hashAlg, 'importkey');
    let algInst: any = algorithm.algorithm;

    return this.crypto.importKey(format, buffer, algInst, true, algorithm.usages);
  }

  public encryptPrivateKeyWithSymmetricKey(privateKey: CryptoKey, symmetricKey: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.exportKey(privateKey, 'pkcs8')
        .then((privateRawKey: ArrayBuffer) => {
          this.cryptographicOperations.encrypt(
            this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA-256', 'encrypt').algorithm,
            symmetricKey, privateRawKey)
            .then((ciphertext: ArrayBuffer) => {
              let cipherArray: Uint8Array = new Uint8Array(ciphertext);
              let encodedEncryptedPrivateKey = this.cryptographicOperations.convertUint8ToString(cipherArray);
              observer.next(encodedEncryptedPrivateKey);
              observer.complete();
            });
        });
    });
  }

  public decryptPrivateKeyWithSymmetricKey(encodedEncryptedPrivateKey: string,
                                           symmetricKey: CryptoKey): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.decryptPrivateKeyWithSymmetricKeyRawFormat(encodedEncryptedPrivateKey, symmetricKey)
        .subscribe((privateRawKey: ArrayBuffer) => {
          this.importKey(privateRawKey, 'pkcs8', 'RSA-PSS')
            .then((privateKey: CryptoKey) => {
              observer.next(privateKey);
              observer.complete();
            });
        })
    });
  }

  public decryptPrivateKeyWithSymmetricKeyRawFormat(encodedEncryptedPrivateKey: string,
                                                    symmetricKey: CryptoKey): Observable<ArrayBuffer> {
    return Observable.create((observer) => {
      let cipherArray: Uint8Array = this.cryptographicOperations.convertStringToUint8(encodedEncryptedPrivateKey);
      let cipherBuffer: ArrayBuffer = cipherArray.buffer;
      this.cryptographicOperations.decrypt(
        this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA-256', 'decrypt').algorithm, symmetricKey,
        cipherBuffer).then((privateRawKey: ArrayBuffer) => {
        observer.next(privateRawKey);
        observer.complete();
      });
    });
  }

}
