import {NG_VALIDATORS} from "@angular/forms";
import {Directive} from "@angular/core";
import {IdeaValidators} from "../../../core/validators/idea.validators";
/**
 * Created by AKuzmanoski on 06/01/2017.
 */

@Directive({
  selector: "[ideal-password-matcher]",
  providers: [
    {provide: NG_VALIDATORS, multi: true, useValue: IdeaValidators.passwordMatcher}
  ]
})
export class PasswordMatcherDirective {

}
