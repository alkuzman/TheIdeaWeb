/**
 * Created by Viki on 11/1/2016.
 */
import {User} from "../../model/authentication/user";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {forwardRef, Directive} from "@angular/core";
import {UserPasswordFieldsComponent} from "../component/user-password/user-password-fields/user-password-fields.component";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserPasswordValueAccessorDirective),
  multi: true
};

@Directive({
  selector: 'ideal-user-password-fields',
  host: {'(userChange)': 'onChange($event)'},
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class UserPasswordValueAccessorDirective implements ControlValueAccessor {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private host: UserPasswordFieldsComponent) {
  }

  //From ControlValueAccessor interface
  writeValue(user: User) {
    this.host.user = user;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  //Set touched on blur
  onBlur() {
    this.onTouched();
  }
}
