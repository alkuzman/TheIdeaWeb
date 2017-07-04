import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shareable} from "../../../../model/sharing/sharable";
import {Notice} from "../../../../model/sharing/notice";
import {Agent} from "../../../../model/authentication/agent";
import {NewPackageNotice} from "../../../../model/sharing/new-package-notice";
import {Package} from "../../../../model/sharing/package";
import {NoticeService} from "../../../../services/notice/notice.service";
import {NoticeList} from "../../../../model/sharing/notice-list";

@Component({
  selector: 'ideal-send-notice-form',
  templateUrl: './send-notice-form.component.html',
  styleUrls: ['./send-notice-form.component.css']
})
export class SendNoticeFormComponent implements OnInit {

  @Input("shareable") shareable: Shareable;
  notices: Notice[];
  @Output("noticesSent") noticesSent: EventEmitter<Notice[]> = new EventEmitter();

  constructor(private noticeService: NoticeService) { }

  ngOnInit() {
    this.notices = [];
  }

  save() {
    let noticeList = new NoticeList();
    noticeList.notices = this.notices;
    console.log(noticeList);
    this.noticeService.addNotices(noticeList).subscribe((returnedNoticeList: Notice[]) => {
      this.notices = returnedNoticeList;
      this.noticesSent.emit(this.notices);
    });
  }

  onRecipientAdded(agent: Agent) {
    let notice = new NewPackageNotice();
    notice.pckg = new Package();
    notice.pckg.shareable = this.shareable;
    notice.recipient = agent;
    this.notices.push(notice);
  }

  onRecipientRemoved(agent: Agent) {
    let index: number = this.recipientIndex(agent);
    if (index == -1)
      return;
    this.notices.splice(index, 1);
  }

  recipientIndex(agent: Agent): number {
    let i: number = 0;
    for (let notice of this.notices) {
      if (notice.recipient.id == agent.id)
        return i;
      i++;
    }
    return -1;
  }

}
