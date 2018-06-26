import {TokenValidator} from '../token-validator';
import {JwtHelperService} from '@auth0/angular-jwt';

export class JwtTokenValidator implements TokenValidator {
  constructor(private jwtHelper: JwtHelperService) {

  }

  isValid(token: string): boolean {
    return token !== null && !this.jwtHelper.isTokenExpired(token, 3);
  }
}
