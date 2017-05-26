import {Component, Input, OnInit} from "@angular/core";
import {Organization} from "../../../model/authentication/organization";
import {MakeProvider} from "../../../../shared/abstract-value-accessor";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {OrganizationFormErrors} from "./organization-form-errors";
import {ValidationMessagesErrors} from "../../../../core/helper/validation-messages-errors";
import {OrganizationValidationMessages} from "./organization-validation-messages";
import {IdeaValidators} from "../../../../core/validators/idea.validators";
/**
 * Created by Viki on 11/23/2016.
 */

@Component({
  moduleId: module.id,
  selector: 'ideal-organization-fields',
  templateUrl: 'organization-fields.component.html',
  styleUrls: ['organization-fields.component.scss'],
  providers: [MakeProvider(OrganizationFieldsComponent)]
})
export class OrganizationFieldsComponent implements OnInit {

  @Input("form") form: FormGroup;
  currentForm: FormGroup;
  @Input("organization") organization: Organization;
  _submitted: boolean;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.organization.name, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.organization.name = value;
    });
    this.form.addControl("name", control);

    control = this.fb.control(this.organization.email, [Validators.required, IdeaValidators.email]);
    control.valueChanges.subscribe((value: string) => {
      this.organization.email = value;
    });
    this.form.addControl("email", control);

    control = this.fb.control(this.organization.description);
    control.valueChanges.subscribe((value: string) => {
      this.organization.description = value;
    });
    this.form.addControl("description", control);
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

  formErrors: OrganizationFormErrors = {
    name: "",
    email: ""
  };

  validationMessages: OrganizationValidationMessages = {
    name: {
      required: 'Name is required'
    },
    email: {
      required: 'Email is required',
      email: 'Email has invalid format'
    }
  };
}
