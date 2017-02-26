import {Injectable} from "@angular/core";
import {getCrypto} from "pkijs/src/common";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import {Observable} from "rxjs";
import {HelperService} from "../helper.service";
/**
 * Created by Viki on 2/4/2017.
 */

var pbkdf2 = require('pbkdf2');

@Injectable()
export class KeysService {

  private crypto: SubtleCrypto;

  constructor(private cryptographicOperations: CryptographicOperations, private helper: HelperService) {
    this.crypto = getCrypto();
  }

  public generatePublicPrivateKeyPair(forSigning: boolean): PromiseLike<CryptoKeyPair> {
    let algorithm;
    let algInst: any;
    if (forSigning) {
      algorithm = this.cryptographicOperations
        .getAlgorithm(this.helper.ASYMMETRIC_SIGNING_ALG, this.helper.HASH_ALG, "generatekey");
      algInst = algorithm.algorithm;
      console.log(algorithm.usages);
    } else {
      algorithm = this.cryptographicOperations
        .getAlgorithm(this.helper.ASYMMETRIC_ENCRYPTION_ALG, this.helper.HASH_ALG, "generatekey");
      algInst = algorithm.algorithm;
      console.log(algorithm.usages);
    }

    return this.crypto.generateKey(algInst, true, algorithm.usages);
  }

  public generateSymmetricKey(): PromiseLike<CryptoKey> {
    let algorithm = this.cryptographicOperations
      .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, "generatekey");
    let algInst: any = algorithm.algorithm;
    return this.crypto.generateKey(algInst, true, algorithm.usages);
  }

  public generateSymmetricKeyFromPasswordAndAdditionalParameters(password: string, numIterations: number,
                                                                 byteLength: number,
                                                                 algorithm: string): PromiseLike<CryptoKey> {
    let keyArray: Buffer = pbkdf2.pbkdf2Sync(password, 'iDeal', numIterations, byteLength, algorithm);
    return this.importKey(keyArray, 'raw', this.helper.SYMMETRIC_ALG);
  }

  public generateSymmetricKeyFromPassword(password: string): PromiseLike<CryptoKey> {
    return this.generateSymmetricKeyFromPasswordAndAdditionalParameters(password, 6530, 32, this.helper.HASH_ALG);
  }

  public exportKey(key: CryptoKey, format: string): PromiseLike<JsonWebKey|ArrayBuffer> {
    return this.crypto.exportKey(format, key);
  }

  public importKey(buffer: BufferSource, format: string, algString: string): PromiseLike<CryptoKey> {
    let algorithm = this.cryptographicOperations.getAlgorithm(algString, this.helper.HASH_ALG, 'importkey');
    let algInst: any = algorithm.algorithm;

    return this.crypto.importKey(format, buffer, algInst, true, algorithm.usages);
  }

  public encryptPrivateKeyWithSymmetricKey(privateKey: CryptoKey, symmetricKey: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.exportKey(privateKey, 'pkcs8')
        .then((privateRawKey: ArrayBuffer) => {
          this.cryptographicOperations.encrypt(
            this.cryptographicOperations
              .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, 'encrypt').algorithm,
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
                                           symmetricKey: CryptoKey, algorithm: string): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.decryptPrivateKeyWithSymmetricKeyRawFormat(encodedEncryptedPrivateKey, symmetricKey)
        .subscribe((privateRawKey: ArrayBuffer) => {
          this.importKey(privateRawKey, 'pkcs8', algorithm)
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
        this.cryptographicOperations
          .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, 'decrypt').algorithm, symmetricKey,
        cipherBuffer).then((privateRawKey: ArrayBuffer) => {
        observer.next(privateRawKey);
        observer.complete();
      });
    });
  }

}
