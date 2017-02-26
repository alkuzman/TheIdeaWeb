import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {StepOneFormErrors} from "./step-one-form-errors";
import {ValidationMessagesErrors} from "../../../../../../../core/helper/validation-messages-errors";
import {StepOneValidationMessages} from "./step-one-validation-messages";
import {ProtocolTransactionMessageOne} from "../../../../../../model/security/messages/protocol-transaction-message-one";
import {Currency} from "../../../../../../model/helpers/currency";
/**
 * Created by Viki on 2/20/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-step-one-fields",
  templateUrl: "step-one-fields.component.html"
})
export class StepOneFieldsComponent implements OnInit {

  @Input("form") form: FormGroup;
  private currentForm: FormGroup;
  private _submitted: boolean;

  @Input("stepData") stepData: ProtocolTransactionMessageOne;

  @Input("submitted")
  set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.stepData.biddingPrice.value, Validators.required);
    control.valueChanges.subscribe((value: number) => {
      this.stepData.biddingPrice.value = value;
    });
    this.form.addControl("bidPrice", control);

    control = this.fb.control(this.stepData.biddingPrice.currency);
    control.valueChanges.subscribe((value: Currency) => {
      this.stepData.biddingPrice.currency = value;
    });
    this.form.addControl("bidCurrency", control);
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

  formErrors: StepOneFormErrors = {
    bidPrice: '',
    bidCurrency: ''
  };

  validationMessages: StepOneValidationMessages = {
    bidPrice: {
      required: 'Bid price is required'
    },
    bidCurrency: {
      required: 'Bid currency is required '
    }
  }
}
