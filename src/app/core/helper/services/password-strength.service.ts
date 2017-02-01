/**
 * Created by AKuzmanoski on 07/01/2017.
 */
import {Injectable} from "@angular/core";
import {PasswordStrength} from "./password-strength";
@Injectable()
export class PasswordStrengthService {
  private hasCapitalLetter: RegExp = /.*[A-Z].*/;
  private hasLetter: RegExp = /.*[a-z].*/;
  private hasNumber: RegExp = /.*\d.*/;
  private hasSpecialCharacter: RegExp = /.*[\W_].*/;

  calculate(password: string): PasswordStrength {
    if (!password || password.length < 8)
      return PasswordStrength.SHORT;
    let strength: number = 1;
    if (this.hasLetter.test(password))
      strength++;
    if (this.hasNumber.test(password))
      strength++;
    if (this.hasCapitalLetter.test(password))
      strength++;
    if (this.hasSpecialCharacter.test(password))
      strength++;

    switch(strength) {
      case 2: return PasswordStrength.WEAK;
      case 3: return PasswordStrength.FAIR;
      case 4: return PasswordStrength.GOOD;
      default: return PasswordStrength.STRONG;
    }
  }

}
