import {Directive} from "@angular/core";
import {IdeaValidators} from "../../../core/validators/idea.validators";
import {NG_VALIDATORS} from "@angular/forms";
/**
 * Created by AKuzmanoski on 08/01/2017.
 */
@Directive({
  selector: "[ideal-email]",
  providers: [
    {provide: NG_VALIDATORS, multi: true, useValue: IdeaValidators.email}
  ]
})
export class EmailValidatorDirective {

}
