import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {ProtocolTransactionMessageOne} from "../../../../../../model/security/messages/protocol-transaction-message-one";
/**
 * Created by Viki on 2/20/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-step-one-form-new",
  templateUrl: "step-one-form-new.component.html"
})
export class StepOneFormNewComponent implements OnInit {
  @Output("dataReady") dataReady: EventEmitter<ProtocolTransactionMessageOne> =
    new EventEmitter<ProtocolTransactionMessageOne>();
  private stepData: ProtocolTransactionMessageOne;

  ngOnInit(): void {
    this.stepData = new ProtocolTransactionMessageOne();
  }

  onDataReady(data: ProtocolTransactionMessageOne) {
    this.dataReady.emit(data);
  }
}
