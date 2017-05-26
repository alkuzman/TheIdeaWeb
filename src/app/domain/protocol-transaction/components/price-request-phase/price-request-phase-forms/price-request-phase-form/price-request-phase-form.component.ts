import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Price} from "../../../../../model/helpers/price";
import {PriceRequestPhaseData} from "../../../../../model/security/data/price-request-phase-data";
/**
 * Created by Viki on 2/20/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-price-request-phase-form",
  templateUrl: "price-request-phase-form.component.html"
})
export class PriceRequestPhaseFormComponent implements OnInit {

  @Input("data") data: PriceRequestPhaseData;
  @Input("currentPrice") currentPrice: Price;
  @Input("lastPrice") lastPrice: Price;
  @Output("dataReady") dataReady: EventEmitter<PriceRequestPhaseData> =
    new EventEmitter<PriceRequestPhaseData>();
  form: FormGroup;
  fields: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  ready() {
    this.submitted = true;
    if (this.form.valid) {
      this.dataReady.emit(this.data);
    }
  }

  readyAccept() {
    this.data.price = this.currentPrice;
    this.dataReady.emit(this.data);
  }
}
