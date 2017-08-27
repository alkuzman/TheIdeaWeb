import {Component, Output, EventEmitter, OnInit, Input} from "@angular/core";
import {PaymentRequestPhaseData} from "../../../../../model/security/data/payment-request-phase-data";
import {Payment} from "../../../../../model/payment/payment";
/**
 * Created by Viki on 2/20/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-price-request-phase-form-new",
  templateUrl: "price-request-phase-form-new.component.html"
})
export class PriceRequestPhaseFormNewComponent implements OnInit {
  @Output("dataReady") dataReady: EventEmitter<PaymentRequestPhaseData> =
    new EventEmitter<PaymentRequestPhaseData>();
  data: PaymentRequestPhaseData;
  @Input("lastPayment") lastPayment: Payment;

  ngOnInit(): void {
    this.data = {};
  }

  onDataReady(data: PaymentRequestPhaseData) {
    this.dataReady.emit(data);
  }
}
