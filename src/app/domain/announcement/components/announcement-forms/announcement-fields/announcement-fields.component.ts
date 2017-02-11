/**
 * Created by AKuzmanoski on 03/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Announcement} from "../../../../model/sharing/announcement";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {AnnouncementFormErrors} from "./announcement-form-errors";
import {AnnouncementValidationMessages} from "./announcement-validation-messages";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-fields",
  templateUrl: "announcement-fields.component.html"
})
export class AnnouncementFieldsComponent {
  @Input("form") form: FormGroup;
  private currentForm: FormGroup;
  @Input("announcement") announcement: Announcement;
  private _submitted: boolean;
  private packageFields: FormGroup;


  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.packageFields = this.fb.group({});
    this.form.addControl("packageFields", this.packageFields);
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

  formErrors: AnnouncementFormErrors = {};

  validationMessages: AnnouncementValidationMessages = {};
}
