import {Injectable} from "@angular/core";
import {KeysService} from "./keys/keys.service";
import {CryptographicOperations} from "./cryptographic-operations/cryptographic-operations";
import {JwtSecurityContext} from "../authentication/jwt/jwt-security-context.service";
import {Observable} from "rxjs";
import {HelperService} from "./helper.service";
import {AlgorithmService} from "./algorithms/algorithms.service";
/**
 * Created by Viki on 3/12/2017.
 */


@Injectable()
export class EncryptingService {

    constructor(private keysService: KeysService, private cryptographicOperation: CryptographicOperations,
                private securityContext: JwtSecurityContext,
                private algorithmService: AlgorithmService) {}


    public encryptSolution(solution: string, password: string): Observable<string> {
        return Observable.create((observer) => {
            this.keysService.decryptSymmetricKeyWithPasswordKey(this.securityContext
                .securityProfile.encryptedSymmetricKey, password).subscribe((key: CryptoKey) => {
                this.cryptographicOperation.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                    key, solution).subscribe((encryptedSolution: string) => {
                        observer.next(encryptedSolution);
                    });
            });
        });
    }
}