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
export class DecryptingService {

    constructor(private keysService: KeysService, private cryptographicOperations: CryptographicOperations,
                private  securityContext: JwtSecurityContext, private helper: HelperService) {}

    public decryptSolution(encryptedSolution: string, password: string): Observable<string> {
        return Observable.create((observer) => {
           this.keysService.decryptSymmetricKeyWithPasswordKey(this.securityContext
               .securityProfile.encryptedSymmetricKey, password)
               .subscribe((key: CryptoKey) => {
               this.cryptographicOperations.decrypt(this.cryptographicOperations
                   .getAlgorithm(this.helper.SYMMETRIC_ALG, this.helper.HASH_ALG, "decrypt").algorithm, key,
                   this.cryptographicOperations.convertStringToUint8(encryptedSolution).buffer)
                   .then((solutionBuf: ArrayBuffer) => {
                       let solution: string = this.cryptographicOperations
                           .convertBufferToString(Buffer.from(solutionBuf));
                       observer.next(solution);
                   });
           });
        });
    }
}