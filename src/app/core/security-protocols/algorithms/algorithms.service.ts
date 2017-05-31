import {Injectable} from "@angular/core";
import {getAlgorithmParameters} from "pkijs/src/common";
import {AlgorithmSP} from "./algorithm-sp";
/**
 * Created by Viki on 4/7/2017.
 */


@Injectable()
export class AlgorithmService {

    public ASYMMETRIC_SIGNING_ALG: string = 'RSASSA-PKCS1-v1_5';
    public ASYMMETRIC_SIGNING_ALG2: string = 'RSA-PSS';
    public ASYMMETRIC_ENCRYPTION_ALG: string = 'RSA-OAEP';
    public HASH_ALG: string = 'SHA-256';
    public HASH_ALG_SHA_512: string = 'sha512';
    public SYMMETRIC_ALG: string = 'AES-CTR';

    constructor() {}

    // Encryption algorithms
    public getAsymmetricEncryptionAlgorithm(): AlgorithmSP {
        return this.getAlgorithm(this.ASYMMETRIC_ENCRYPTION_ALG, this.HASH_ALG, "encrypt");
    }

    public getSymmetricEncryptionAlgorithm(): AlgorithmSP {
        return this.getAlgorithm(this.SYMMETRIC_ALG, this.HASH_ALG, "encrypt");
    }

    // Decryption algorithms
    public getAsymmetricDecryptionAlgorithm(): AlgorithmSP {
        return this.getAlgorithm(this.ASYMMETRIC_ENCRYPTION_ALG, this.HASH_ALG, "decrypt");
    }

    public getSymmetricDecryptionAlgorithm(): AlgorithmSP {
        return this.getAlgorithm(this.SYMMETRIC_ALG, this.HASH_ALG, "decrypt");
    }

    // Generation key algorithms
    public getAsymmetricEncryptionAlgorithmForGenerationKey(): AlgorithmSP {
        return this.getAlgorithm(this.ASYMMETRIC_ENCRYPTION_ALG, this.HASH_ALG, "generatekey");
    }

    public getAsymmetricSigningAlgorithmForGenerationKey(): AlgorithmSP {
        return this.getAlgorithm(this.ASYMMETRIC_SIGNING_ALG, this.HASH_ALG, "generatekey");
    }

    public getSymmetricAlgorithmForGenerationKey(): AlgorithmSP {
        return this.getAlgorithm(this.SYMMETRIC_ALG, this.HASH_ALG, "generatekey");
    }

    public getAlgorithm(alg: string, hashAlg: string, operation: string) {
        let algorithm = getAlgorithmParameters(alg, operation);
        let algorithmInstTemp: any = algorithm.algorithm;
        if ("hash" in algorithm.algorithm) {
            algorithmInstTemp.hash.name = hashAlg;
        }
        return algorithm;
    }

    public getUsagesForAlgorithmAndFormat(algString: string, format: string): string[] {
        switch (format) {
            case ('raw'): {
                return null;
            }
            case ('pkcs8'): {
                switch (algString) {
                    case (this.ASYMMETRIC_ENCRYPTION_ALG): {
                        return ["decrypt"];
                    }
                }
            }
            case ('spki'): {
                switch (algString) {
                    case (this.ASYMMETRIC_ENCRYPTION_ALG):
                        return ["encrypt"];
                }
            }
        }
    }
}