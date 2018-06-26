import {SecurityContext} from '../../../core/authentication/security-context';
import {User} from '../../model/authentication';
import {Observable} from 'rxjs';
import {PrincipalContext} from '../../../core/authentication/principal/principal-context';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContext implements SecurityContext<User> {
  constructor(private principalContext: PrincipalContext) {
  }

  clear(): void {
    this.principalContext.clear();
  }

  get(): User {
    return this.principalContext.get();
  }

  getObservable(): Observable<User> {
    return this.principalContext.getObservable();
  }

  set(data: User): void {
    this.principalContext.set(data);
  }
}
