import {Component, OnInit, Input} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {UserPasswordFormErrors} from "./user-password-form-errors";
import {UserPasswordValidationMessages} from "./user-password-validation-messages";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-password-fields",
  templateUrl: "user-password-fields.component.html"
})
export class UserPasswordFieldsComponent implements OnInit {
  @Input("user") user: User;
  @Input("form") form: FormGroup;
   currentForm: FormGroup;
   _submitted: boolean = false;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    let control = this.fb.control(this.user.password, [Validators.required, Validators.minLength(6)]);
    control.valueChanges.subscribe((value: string) => {
      this.user.password = value;
    });
    this.form.addControl("password", control);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.form) {
      return;
    }
    this.currentForm = this.form;
    if (this.currentForm) {
      this.currentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.currentForm) {
      return;
    }
    const form = this.currentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || this._submitted) && !control.valid) {
        const messages: ValidationMessagesErrors = this.validationMessages[field];
        for (const key in control.errors) {

          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors: UserPasswordFormErrors = {
    password: ''
  };

  validationMessages: UserPasswordValidationMessages = {
    password: {
      required: 'Password is required',
      minlength: 'Password should be at least 6 characters long'
    }
  };
}
