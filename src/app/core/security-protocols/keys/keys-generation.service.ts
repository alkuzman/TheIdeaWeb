import {Injectable} from "@angular/core";
import {getCrypto} from "pkijs/src/common";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
/**
 * Created by Viki on 2/4/2017.
 */

var pbkdf2 = require('pbkdf2');

@Injectable()
export class KeysGenerationService {
  private signAlg: string = "RSA-PSS";
  private hashAlg: string = "SHA-256";
  private crypto: SubtleCrypto;

  constructor(private criptogrphicOperations: CryptographicOperations) {
    this.crypto = getCrypto();
  }

  public generatePublicPrivateKeyPair(): PromiseLike<CryptoKeyPair> {
    let algorithm = this.criptogrphicOperations.getAlgorithm(this.signAlg, this.hashAlg, "generatekey");
    let algInst: any = algorithm.algorithm
    return this.crypto.generateKey(algInst, true, algorithm.usages);
  }

  public generateSymmetricKeyFromPassword(password: string, numIterations: number, byteLength: number,
                                          algorithm: string): Buffer {
    return pbkdf2.pbkdf2Sync(password, 'iDeal', numIterations, byteLength, algorithm);
  }

  public exportKey(key: CryptoKey, format: string): PromiseLike<JsonWebKey|ArrayBuffer> {
    return this.crypto.exportKey(format, key);
  }

  public importKey(buffer: BufferSource, format: string, algString: string): PromiseLike<CryptoKey> {
    let algorithm = this.criptogrphicOperations.getAlgorithm(algString, this.hashAlg, 'importkey');
    let algInst: any = algorithm.algorithm;

    return this.crypto.importKey(format, buffer, algInst, true, algorithm.usages);
  }

}
