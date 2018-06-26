import {Injectable} from '@angular/core';
import {AbstractSecurityContext} from '../../../core/authentication/abstract-security-context';
import {SecurityProfile} from '../../model/security/security-profile';

@Injectable({
  providedIn: 'root'
})
export class SecurityProfileContext extends AbstractSecurityContext<SecurityProfile> {
  extractContext(data: any): SecurityProfile {
    return data.securityProfile;
  }

  getKey(): string {
    return 'security_profile';
  }
}
