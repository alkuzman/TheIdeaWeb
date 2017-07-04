/**
 * Created by Viki on 1/25/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {NewPackageNotice} from "../../../../model/sharing/new-package-notice";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "ideal-notice-fields",
  templateUrl: "notice-fields.component.html"
})
export class NoticeFieldsComponent implements OnInit {
  @Input("notice") notice: NewPackageNotice;
  @Input("form") form: FormGroup;
  @Input("submitted") submitted: boolean;
  packageFields: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.packageFields = this.fb.group({});
    this.form.addControl("packageFields", this.packageFields);
  }
/*
  onRecipientAdded(agent: Agent) {
    let recipient: Recipient = new Recipient();
    recipient.agent = agent;
    this.notice.recipient.push(recipient);
  }

  onRecipientRemoved(agent: Agent) {
    let index: number = this.recipientIndex(agent);
    if (index == -1)
      return;
    this.notice.recipient.splice(index, 1);
  }

  recipientIndex(agent: Agent): number {
    let i: number = 0;
    for (let recipient of this.notice.recipient) {
      if (agent.id == recipient.agent.id)
        return i;
      i++;
    }
    return -1;
  }
  */
}