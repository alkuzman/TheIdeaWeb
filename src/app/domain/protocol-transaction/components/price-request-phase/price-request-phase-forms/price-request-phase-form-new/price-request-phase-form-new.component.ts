import {Component, Output, EventEmitter, OnInit, Input} from "@angular/core";
import {PriceRequestPhaseData} from "../../../../../model/security/data/price-request-phase-data";
/**
 * Created by Viki on 2/20/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-price-request-phase-form-new",
  templateUrl: "price-request-phase-form-new.component.html"
})
export class PriceRequestPhaseFormNewComponent implements OnInit {
  @Output("dataReady") dataReady: EventEmitter<PriceRequestPhaseData> =
    new EventEmitter<PriceRequestPhaseData>();
  private data: PriceRequestPhaseData;
  @Input("previousData") previousData: PriceRequestPhaseData;

  ngOnInit(): void {
    this.data = {};
  }

  onDataReady(data: PriceRequestPhaseData) {
    this.dataReady.emit(data);
  }
}
