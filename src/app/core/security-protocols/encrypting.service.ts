import {Injectable} from "@angular/core";
import {KeysService} from "./keys/keys.service";
import {CryptographicOperations} from "./cryptographic-operations/cryptographic-operations";
import {JwtSecurityContext} from "../authentication/jwt/jwt-security-context.service";
import {Observable} from "rxjs";
import {HelperService} from "./helper.service";
/**
 * Created by Viki on 3/12/2017.
 */


@Injectable()
export class EncryptingService {

    constructor(private keysService: KeysService, private cryptographicOperation: CryptographicOperations,
                private securityContext: JwtSecurityContext, private helper: HelperService) {}


    public encryptSolution(solution: string, password: string): Observable<string> {
        return Observable.create((observer) => {
            this.keysService.decryptSymmetricKeyWithPasswordKey(this.securityContext
                .securityProfile.encryptedSymmetricKey, password).subscribe((key: CryptoKey) => {
                this.cryptographicOperation.encrypt(this.cryptographicOperation
                    .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, "encrypt").algorithm,
                    key, this.cryptographicOperation.convertStringToBuffer(solution))
                    .then((encryptedSolutionBuf: ArrayBuffer) => {
                        let encryptedSolution: string = this.cryptographicOperation
                            .convertUint8ToString(new Uint8Array(encryptedSolutionBuf));
                        observer.next(encryptedSolution);
                    });
            });
        });
    }
}