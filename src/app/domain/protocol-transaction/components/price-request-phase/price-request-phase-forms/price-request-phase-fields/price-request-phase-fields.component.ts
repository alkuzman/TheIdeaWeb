import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {PriceRequestPhaseFormErrors} from "./price-request-phase-form-errors";
import {PriceRequestPhaseValidationMessages} from "./price-request-phase-validation-messages";
import {Price} from "../../../../../model/helpers/price";
import {Currency} from "../../../../../model/helpers/currency";
import {ValidationMessagesErrors} from "../../../../../../core/helper/validation-messages-errors";
import {PriceRequestPhaseData} from "../../../../../model/security/data/price-request-phase-data";
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
  private currentForm: FormGroup;
  private _submitted: boolean;

  @Input("data") data: PriceRequestPhaseData;
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
    if (this.data.price == null) {
      this.data.price = new Price();
    }
    let control: FormControl = this.fb.control(this.data.price.value, Validators.required);
    control.valueChanges.subscribe((value: number) => {
      this.data.price.value = value;
    });
    this.form.addControl("price", control);

    control = this.fb.control(this.data.price.currency);
    control.valueChanges.subscribe((value: Currency) => {
      this.data.price.currency = value;
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
