import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {SecurityFieldsEncryptionPasswordErrors} from "./security-fields-encryption-password-errors";
import {SecurityValidationMessages} from "./security-validation-messages";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
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

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }


  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.password, Validators.required);
    control.valueChanges.subscribe((value) => {
      this.password = value;
      this.passwordReady.emit(this.password);
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

  formErrors: SecurityFieldsEncryptionPasswordErrors = {
    password: ''
  };

  validationMessages: SecurityValidationMessages = {
    password: {
      required: 'Password is required'
    }
  };
}
