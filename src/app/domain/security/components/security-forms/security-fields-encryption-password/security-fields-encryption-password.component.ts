import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {SecurityFieldsEncryptionPasswordErrors} from "./security-fields-encryption-password-errors";
import {SecurityValidationMessages} from "./security-validation-messages";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {IdeaValidators} from "../../../../../core/validators/idea.validators";
import {PasswordStrength} from "../../../../../core/helper/services/password-strength";
import {PasswordStrengthService} from "../../../../../core/helper/services/password-strength.service";
/**
 * Created by Viki on 2/12/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-security-fields-encryption-password",
  templateUrl: "security-fields-encryption-password.component.html"
})
export class SecurityFieldsEncryptionPasswordComponent implements OnInit {

  @Input("form") form: FormGroup;
  private currentForm: FormGroup;
  @Input("password") password: string;
  @Output("passwordReady") passwordReady: EventEmitter<string> = new EventEmitter<string>();
  private _submitted: boolean = false;

  private passwordStrengthVisible: boolean = false;
  private passwordStrength: string;
  private passwordStrengthProgress: number;
  private passwordStrengthColor: string;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }


  constructor(private fb: FormBuilder, private passwordStrengthService: PasswordStrengthService) {

  }

  ngOnInit(): void {
    let passwords: FormGroup = this.fb.group({});
    passwords.setValidators(IdeaValidators.passwordMatcher);

    let control: FormControl = this.fb.control(this.password, [Validators.required, Validators.minLength(6)]);
    control.valueChanges.subscribe((value) => {
      this.password = value;
      this.calculatePasswordStrength();
      this.passwordReady.emit(this.password);
    });
    passwords.addControl("password", control);

    control = this.fb.control("", [Validators.required]);
    passwords.addControl("confirmPassword", control);

    this.form.addControl("passwords", passwords);

    this.calculatePasswordStrength();
  }

  showPasswordStrength() {
    this.passwordStrengthVisible = true;
  }

  hidePasswordStrength() {
    this.passwordStrengthVisible = false;
  }

  calculatePasswordStrength() {
    let passwordStrength: PasswordStrength = this.passwordStrengthService.calculate(this.password);
    this.setupForPasswordStrength(passwordStrength);
  }

  setupForPasswordStrength(passwordStrength: PasswordStrength) {
    this.passwordStrengthProgress = (passwordStrength + 1) * 20;
    this.passwordStrength = PasswordStrength[passwordStrength];
    if (passwordStrength <= 1)
      this.passwordStrengthColor = "warn";
    else if (passwordStrength == 2)
      this.passwordStrengthColor = "accent";
    else this.passwordStrengthColor = "primary";
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

  formErrors: SecurityFieldsEncryptionPasswordErrors = {
    "passwords.password": '',
    "passwords.confirmPassword": '',
    passwords: ''
  };

  validationMessages: SecurityValidationMessages = {
    "passwords.password": {
      required: 'Password is required',
      minlength: 'Password should be at least 6 characters long',
      pattern: "Password should have minimum 8 characters, at least 1 alphabet, 1 number and 1 special character"
    },
    "passwords.confirmPassword": {
      required: 'Confirm password is required'
    },
    passwords: {
      passwordMatcher: 'Confirm Password and Password must match'
    }
  };
}
