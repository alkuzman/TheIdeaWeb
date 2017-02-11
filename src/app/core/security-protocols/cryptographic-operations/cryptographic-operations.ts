import {Injectable} from "@angular/core";
import {getCrypto, getAlgorithmParameters} from "pkijs/src/common";
import * as CryptoJS from "crypto-js";

/**
 * Created by Viki on 2/7/2017.
 */

@Injectable()
export class CryptographicOperations {
  private crypto: SubtleCrypto;

  constructor() {
    this.crypto = getCrypto();
  }

  public encrypt(algorithm: Algorithm, key: CryptoKey, data: BufferSource): PromiseLike<ArrayBuffer> {
    return this.crypto.encrypt(algorithm, key, data);
  }

  public decrypt(algorithm: Algorithm, key: CryptoKey, data: BufferSource): PromiseLike<ArrayBuffer> {
    return this.crypto.decrypt(algorithm, key, data);
  }

  public getAlgorithm(alg: string, hashAlg: string, operation: string) {
    let algorithm = getAlgorithmParameters(alg, operation);
    let algorithmInstTemp: any = algorithm.algorithm;
    if ("hash" in algorithm.algorithm) {
      algorithmInstTemp.hash.name = hashAlg;
    }
    return algorithm;
  }

  public convertUint8ToString(array: Uint8Array): string {
    return btoa(String.fromCharCode.apply(null, array));
  }

  public convertStringToUint8(text: string): Uint8Array {
    return new Uint8Array(atob(text).split("").map((character) => character.charCodeAt(0)));
  }

  public hash(value: string): string {
    return CryptoJS.SHA256(value);
  }
}
