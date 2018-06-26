import {Injectable} from '@angular/core';
import {KeysService} from './keys/keys.service';
import {CryptographicOperations} from './cryptographic-operations/cryptographic-operations';
import {Observable} from 'rxjs';
import {AlgorithmService} from './algorithms/algorithms.service';
import {SecurityProfileContext} from '../../domain/security/security-profile-context/security-profile-context';

/**
 * Created by Viki on 3/12/2017.
 */


@Injectable()
export class DecryptingService {

  constructor(private keysService: KeysService, private cryptographicOperations: CryptographicOperations,
              private securityProfileContext: SecurityProfileContext,
              private algorithmService: AlgorithmService) {
  }

  public decryptSolution(encryptedSolution: string, password: string): Observable<string> {
    return Observable.create((observer) => {
      this.keysService.decryptSymmetricKeyWithPasswordKey(this.securityProfileContext
        .get().encryptedSymmetricKey, password)
        .subscribe((key: CryptoKey) => {
          console.log(encryptedSolution);
          this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm, key,
            encryptedSolution).subscribe((solution: string) => {
            observer.next(solution);
          });
        });
    });
  }

  public decryptSolutionWithKey(encryptedSolution: string, key: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm, key,
        encryptedSolution).subscribe((solution: string) => {
        observer.next(solution);
      });
    });
  }
}
