import {Injectable} from '@angular/core';
import {AbstractSecurityContext} from '../abstract-security-context';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenContext extends AbstractSecurityContext<string> {
  extractContext(data: any): string {
    return data.token;
  }

  getKey(): string {
    return 'auth_token';
  }
}
