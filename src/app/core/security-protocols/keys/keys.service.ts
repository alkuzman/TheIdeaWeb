import {Injectable} from "@angular/core";
import {getCrypto} from "pkijs/src/common";
import {Observable} from "rxjs";
import {SimpleCryptographicOperations} from "../cryptographic-operations/simple-cryptographic-operations";
import {AlgorithmService} from "../algorithms/algorithms.service";
import {AlgorithmSP} from "../algorithms/algorithm-sp";
/**
 * Created by Viki on 2/4/2017.
 */

const pbkdf2 = require('pbkdf2');

@Injectable()
export class KeysService {

  private crypto: SubtleCrypto;

  constructor(private cryptographicOperations: SimpleCryptographicOperations,
              private algorithmService: AlgorithmService) {
    this.crypto = getCrypto();
  }

  public generatePublicPrivateKeyPair(forSigning: boolean): PromiseLike<CryptoKeyPair> {
    let algorithm: AlgorithmSP;
    if (forSigning) {
      algorithm = this.algorithmService.getAsymmetricSigningAlgorithmForGenerationKey();
    } else {
      algorithm = this.algorithmService.getAsymmetricEncryptionAlgorithmForGenerationKey();
    }
    let algInst: any = algorithm.algorithm;

    return this.crypto.generateKey(algInst, true, algorithm.usages);
  }

  public generateSymmetricKey(): PromiseLike<CryptoKey> {
    let algorithm: AlgorithmSP = this.algorithmService.getSymmetricAlgorithmForGenerationKey();
    let algInst: any = algorithm.algorithm;
    return this.crypto.generateKey(algInst, true, algorithm.usages);
  }

  public generateSymmetricKeyFromPasswordAndAdditionalParameters(password: string, numIterations: number,
                                                                 byteLength: number,
                                                                 algorithm: string): PromiseLike<CryptoKey> {
    let keyArray: BufferSource = pbkdf2.pbkdf2Sync(password, 'iDeal', numIterations, byteLength, algorithm);
    return this.basicImportKey(keyArray, 'raw', this.algorithmService.SYMMETRIC_ALG);
  }

  public generateSymmetricKeyFromPassword(password: string): PromiseLike<CryptoKey> {
    return this.generateSymmetricKeyFromPasswordAndAdditionalParameters(password, 6530, 32, 'sha512');
  }

  public exportKey(key: CryptoKey, format: "raw" | "pkcs8" | "spki" | string): Observable<string> {
    return Observable.create((observer) => {
      this.basicExportKey(key, format).then((keyBuf: ArrayBuffer) => {
        let key: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(keyBuf));
        observer.next(key);
      });
    });
  }

  public basicExportKey(key: CryptoKey, format: "raw" | "pkcs8" | "spki" | string): PromiseLike<JsonWebKey
    | ArrayBuffer> {
    return this.crypto.exportKey(format, key);
  }

  public importKey(rawKey: string, format: string, algString: string): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.basicImportKey(this.cryptographicOperations.convertStringToUint8(rawKey).buffer, format, algString)
        .then((key: CryptoKey) => {
          observer.next(key);
        });
    });
  }

  public basicImportKey(buffer: BufferSource, format: string, algString: string): PromiseLike<CryptoKey> {
    let algorithm = this.algorithmService.getAlgorithm(algString, this.algorithmService.HASH_ALG, 'importkey');
    let algInst: any = algorithm.algorithm;

    return this.crypto.importKey(format, buffer, algInst, true,
      this.algorithmService.getUsagesForAlgorithmAndFormat(algString, format) || algorithm.usages);
  }

  public encryptPrivateKeyWithSymmetricKey(privateKey: CryptoKey, symmetricKey: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.basicExportKey(privateKey, 'pkcs8')
        .then((privateRawKey: ArrayBuffer) => {
          this.cryptographicOperations.encrypt(
            this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
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
          this.basicImportKey(privateRawKey, 'pkcs8', algorithm)
            .then((privateKey: CryptoKey) => {
              observer.next(privateKey);
              observer.complete();
            });
        })
    });
  }

  public extractPrivateKey(encryptedKey: string, password: string, algorithm: string): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.generateSymmetricKeyFromPassword(password)
        .then((symmetricKey: CryptoKey) => {
          this.decryptPrivateKeyWithSymmetricKey(encryptedKey, symmetricKey, algorithm)
            .subscribe((privateKey: CryptoKey) => {
              observer.next(privateKey);
            });
        });

    });
  }

  public decryptPrivateKeyWithSymmetricKeyRawFormat(encodedEncryptedPrivateKey: string,
                                                    symmetricKey: CryptoKey): Observable<ArrayBuffer> {
    return Observable.create((observer) => {
      let cipherArray: Uint8Array = this.cryptographicOperations.convertStringToUint8(encodedEncryptedPrivateKey);
      let cipherBuffer: ArrayBuffer = cipherArray.buffer;
      this.cryptographicOperations.decrypt(
        this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm, symmetricKey,
        cipherBuffer).then((privateRawKey: ArrayBuffer) => {
        observer.next(privateRawKey);
        observer.complete();
      });
    });
  }

  public decryptSessionKey(encryptedSessionKey: string, decryptionKey: CryptoKey): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.cryptographicOperations.decrypt(this.algorithmService.getAsymmetricDecryptionAlgorithm().algorithm,
        decryptionKey, this.cryptographicOperations
          .convertStringToUint8(encryptedSessionKey).buffer)
        .then((sessionKeyBuf: ArrayBuffer) => {
          this.basicImportKey(sessionKeyBuf, 'raw', this.algorithmService.SYMMETRIC_ALG)
            .then((sessionKey: CryptoKey) => {
              observer.next(sessionKey);
            });
        });
    })
  }

  public encryptSessionKey(sessionKey: CryptoKey, encryptionKey: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.basicExportKey(sessionKey, "raw").then((sessionKeyBuf: ArrayBuffer) => {
        this.cryptographicOperations.encrypt(this.algorithmService.getAsymmetricEncryptionAlgorithm().algorithm,
          encryptionKey, sessionKeyBuf).then((encryptedSessionKeyBuf: ArrayBuffer) => {
          observer.next(this.cryptographicOperations
            .convertUint8ToString(new Uint8Array(encryptedSessionKeyBuf)));
        });
      });
    });
  }

  public encryptSymmetricKeyWithPasswordKey(key: CryptoKey, password: string): Observable<string> {
    return Observable.create((observer) => {
      this.generateSymmetricKeyFromPassword(password).then((passwordKey: CryptoKey) => {
        this.encryptSymmetricKey(key, passwordKey).subscribe((encryptedKey: string) => {
          observer.next(encryptedKey);
        });
      });
    });
  }

  public encryptSymmetricKey(key: CryptoKey, encryptionKey: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.basicExportKey(key, "raw").then((keyBuf: ArrayBuffer) => {
        this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
          encryptionKey, keyBuf).then((encryptedKeyBuf: ArrayBuffer) => {
          let encryptedKey: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(encryptedKeyBuf));
          observer.next(encryptedKey);
        });
      });
    });
  }

  public decryptSymmetricKeyWithPasswordKey(encryptedKey: string, password: string): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.generateSymmetricKeyFromPassword(password).then((passwordKey: CryptoKey) => {
        this.decryptSymmetricKey(encryptedKey, passwordKey).subscribe((key: CryptoKey) => {
          observer.next(key);
        });
      });
    });
  }

  public decryptSymmetricKey(encryptedKey: string, decryptionKey: CryptoKey): Observable<CryptoKey> {
    return Observable.create((observer) => {
      this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
        decryptionKey, this.cryptographicOperations.convertStringToUint8(encryptedKey).buffer)
        .then((keyBuf: ArrayBuffer) => {
          this.basicImportKey(keyBuf, "raw", this.algorithmService.SYMMETRIC_ALG)
            .then((key: CryptoKey) => {
              observer.next(key);
            });
        });
    });
  }

}
