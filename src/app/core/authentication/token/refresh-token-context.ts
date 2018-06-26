import {Injectable} from '@angular/core';
import {AbstractSecurityContext} from '../abstract-security-context';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenContext extends AbstractSecurityContext<string> {
  extractContext(data: any): string {
    return data.refreshToken;
  }

  getKey(): string {
    return 'auth_refresh_token';
  }
}
