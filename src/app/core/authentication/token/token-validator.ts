import {Injectable} from '@angular/core';
import {JwtTokenValidator} from './jwt/jwt-token-validator';

@Injectable({
  providedIn: 'root',
  useClass: JwtTokenValidator
})
export abstract class TokenValidator {
  abstract isValid(token: string): boolean;
}
