import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {ProtocolTransactionMessageOne} from "../../../../../../model/security/messages/protocol-transaction-message-one";
import {FormGroup, FormBuilder} from "@angular/forms";
/**
 * Created by Viki on 2/20/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-step-one-form",
  templateUrl: "step-one-form.component.html"
})
export class StepOneFormComponent implements OnInit {

  @Input("stepData") stepData: ProtocolTransactionMessageOne;
  @Output("dataReady") dataReady: EventEmitter<ProtocolTransactionMessageOne> =
    new EventEmitter<ProtocolTransactionMessageOne>();
  private form: FormGroup;
  private fields: FormGroup;
  private submitted: boolean = false;

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
      this.dataReady.emit(this.stepData);
    }
  }
}
