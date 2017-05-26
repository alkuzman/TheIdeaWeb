import {Component, OnInit, Input, AfterViewChecked} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {AvatarType} from "../../../../../shared/widget/components/avatars/named-avatar/enum-avatar-type";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {RegisterFormErrors} from "./register-form-errors";
import {ValidationMessages} from "./register-validation-messages";
import {IdeaValidators} from "../../../../../core/validators/idea.validators";
import {PasswordStrength} from "../../../../../core/helper/services/password-strength";
import {PasswordStrengthService} from "../../../../../core/helper/services/password-strength.service";
import {CountryService} from "../../../../services/localization/country.service";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-fields",
  templateUrl: "register-fields.component.html",
  styleUrls: ["register-fields.component.scss"]
})
export class RegisterFieldsComponent implements OnInit, AfterViewChecked {
  userAvatarType: AvatarType = AvatarType.CHOOSER;
  @Input("form") form: FormGroup;
  currentForm: FormGroup;
  @Input("user") user: User;
  _submitted: boolean = false;
  passwordStrengthVisible: boolean = false;
  passwordStrength: string;
  passwordStrengthProgress: number;
  passwordStrengthColor: string;
  countries: string[];

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder, private passwordStrengthService: PasswordStrengthService,
              private countryService: CountryService) {

  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.user.firstName, [Validators.required]);
    control.valueChanges.subscribe((value: string) => {
      this.user.firstName = value;
    });
    this.form.addControl("firstName", control);

    control = this.fb.control(this.user.lastName, [Validators.required]);
    control.valueChanges.subscribe((value: string) => {
      this.user.lastName = value;
    });
    this.form.addControl("lastName", control);

    let passwords: FormGroup = this.fb.group({});
    passwords.setValidators(IdeaValidators.passwordMatcher);

    control = this.fb.control(this.user.password, [Validators.required, Validators.minLength(6)]);
    control.valueChanges.subscribe((value: string) => {
      this.user.password = value;
      this.calculatePasswordStrength();
    });
    passwords.addControl("password", control);

    control = this.fb.control("", [Validators.required]);
    passwords.addControl("confirmPassword", control);
    this.form.addControl("passwords", passwords);

    this.calculatePasswordStrength();

    this.countries = this.countryService.getCountries();
    control = this.fb.control(this.user.country, [Validators.required]);
    control.valueChanges.subscribe((value: string) => {
      this.user.country = value;
    });
    this.form.addControl('country', control);
  }


  showPasswordStrength() {
    this.passwordStrengthVisible = true;
  }

  hidePasswordStrength() {
    this.passwordStrengthVisible = false;
  }

  calculatePasswordStrength() {
    let passwordStrength: PasswordStrength = this.passwordStrengthService.calculate(this.user.password);
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

  formErrors: RegisterFormErrors = {
    firstName: '',
    lastName: '',
    "passwords.password": '',
    "passwords.confirmPassword": '',
    passwords: '',
    country: ''
  };

  validationMessages: ValidationMessages = {
    firstName: {
      required: 'First name is required.'
    },
    lastName: {
      required: 'Last name is required.'
    },
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
    },
    country: {
      required: 'Country is required.'
    }
  };
}
