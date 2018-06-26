import {Injectable} from '@angular/core';
import {AbstractSecurityContext} from '../abstract-security-context';

@Injectable({
  providedIn: 'root'
})
export class PrincipalContext extends AbstractSecurityContext<any> {
  extractContext(data: any): any {
    return data.user;
  }

  getKey(): string {
    return 'auth_principal';
  }
}
