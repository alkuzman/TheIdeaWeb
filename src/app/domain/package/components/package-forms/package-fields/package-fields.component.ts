/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Package} from "../../../../model/sharing/package";
import {FormGroup, FormBuilder} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {PackageFormErrors} from "./package-form-errors";
import {PackageValidationMessages} from "./package-validation-messages";
@Component({
  moduleId: module.id,
  selector: "ideal-package-fields",
  templateUrl: "package-fields.component.html",
})
export class PackageFieldsComponent {
  @Input("form") form: FormGroup;
  private currentForm: FormGroup;
  @Input("package") package: Package;
  private _submitted: boolean;


  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

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

  formErrors: PackageFormErrors = {};

  validationMessages: PackageValidationMessages = {};
}
