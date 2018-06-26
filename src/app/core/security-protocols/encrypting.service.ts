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
export class EncryptingService {

  constructor(private keysService: KeysService, private cryptographicOperation: CryptographicOperations,
              private securityProfileContext: SecurityProfileContext,
              private algorithmService: AlgorithmService) {
  }


  public encryptSolution(solution: string, password: string): Observable<string> {
    return Observable.create((observer) => {
      this.keysService.decryptSymmetricKeyWithPasswordKey(this.securityProfileContext
        .get().encryptedSymmetricKey, password).subscribe((key: CryptoKey) => {
        this.cryptographicOperation.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
          key, solution).subscribe((encryptedSolution: string) => {
          observer.next(encryptedSolution);
        });
      });
    });
  }

  public encryptSolutionWithKey(solution: string, key: CryptoKey): Observable<string> {
    return Observable.create((observer) => {
      this.cryptographicOperation.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
        key, solution).subscribe((encryptedSolution: string) => {
        observer.next(encryptedSolution);
      });
    });
  }
}
