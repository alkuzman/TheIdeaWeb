import {AbstractControl, FormControl} from "@angular/forms";
/**
 * Created by AKuzmanoski on 08/01/2017.
 */
export class IdeaValidators {
  public static passwordMatcher(c: AbstractControl) {
    if (!c.get("password") || !c.get("confirmPassword")) return null;
    return c.get("password").value === c.get("confirmPassword").value ? null : {'passwordMatcher': true}
  }

  public static email(c: FormControl) {
    if (!c.value || c.value == "") return null;

    let EMAIL_REGEXP: RegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
        "email": true
      };
  }
}
