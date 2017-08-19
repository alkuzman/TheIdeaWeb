import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {PriceRequestPhaseFormErrors} from "./price-request-phase-form-errors";
import {PriceRequestPhaseValidationMessages} from "./price-request-phase-validation-messages";
import {Price} from "../../../../../model/payment/price";
import {Currency} from "../../../../../model/helpers/currency";
import {ValidationMessagesErrors} from "../../../../../../core/helper/validation-messages-errors";
import {PaymentRequestPhaseData} from "../../../../../model/security/data/payment-request-phase-data";
/**
 * Created by Viki on 2/20/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-price-request-phase-fields",
  templateUrl: "price-request-phase-fields.component.html"
})
export class PriceRequestPhaseFieldsComponent implements OnInit {
  @Input("form") form: FormGroup;
  currentForm: FormGroup;
  _submitted: boolean;

  @Input("data") data: PaymentRequestPhaseData;
  @Input("lastPrice") lastPrice: Price;
  @Input("currentPrice") currentPrice: Price;

  @Input("submitted")
  set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.data.payment == null) {
      this.data.payment = new Price();
    } else if (this.data.payment.type !== "Price") {
      console.log("incorrect payment method");
    }
    let control: FormControl = this.fb.control((<Price>this.data.payment).value, Validators.required);
    control.valueChanges.subscribe((value: number) => {
        (<Price>this.data.payment).value = value;
    });
    this.form.addControl("payment", control);

    control = this.fb.control((<Price>this.data.payment).currency);
    control.valueChanges.subscribe((value: Currency) => {
        (<Price>this.data.payment).currency = value;
    });
    this.form.addControl("currency", control);
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

  validationMessages: PriceRequestPhaseValidationMessages = {
    price: {
      required: 'Price is required'
    },
    currency: {
      required: 'Price currency is required '
    }
  };


  formErrors: PriceRequestPhaseFormErrors = {
    price: '',
    currency: ''
  };

}
