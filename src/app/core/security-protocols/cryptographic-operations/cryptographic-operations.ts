import {Injectable} from "@angular/core";
import {getCrypto, getAlgorithmParameters} from "pkijs/src/common";

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

  public decrpt(algorithm: Algorithm, key: CryptoKey, data): PromiseLike<ArrayBuffer> {
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
}
