import {Component, OnInit, Input} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserEmailFormErrors} from "./user-email-form-errors.properties";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {UserEmailFormValidationMessages} from "./user-email-form-validation-messages";
import {IdeaValidators} from "../../../../../core/validators/idea.validators";
/**
 * Created by Viki on 10/31/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-email-fields",
  templateUrl: "user-email-fields.component.html",
  styleUrls: ["user-email-fields.component.scss"]
})
export class UserEmailFieldsComponent implements OnInit {
  _submitted: boolean = false;
  @Input("form") currentForm: FormGroup;
  @Input("user") user: User;
  emailForm: FormGroup;
  emailControl: FormControl;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.emailControl = this.fb.control(this.user.email, [Validators.required, IdeaValidators.email]);
    this.emailControl.valueChanges.subscribe((value: string) => {
      this.user.email = value;
    });
    this.currentForm.addControl("email", this.emailControl);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.emailForm) {
      return;
    }
    this.emailForm = this.currentForm;
    if (this.emailForm) {
      this.emailForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.emailForm) {
      return;
    }
    const form = this.emailForm;
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

  formErrors: UserEmailFormErrors = {
    email: ""
  };

  validationMessages: UserEmailFormValidationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Email has invalid format'
    }
  };
}
