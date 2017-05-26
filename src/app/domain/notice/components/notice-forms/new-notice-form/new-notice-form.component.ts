/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Sharable} from "../../../../model/sharing/sharable";
import {NewPackageNotice} from "../../../../model/sharing/new-package-notice";
import {Package} from "../../../../model/sharing/package";
import {NoticeService} from "../../../../services/notice/notice.service";
import {Notice} from "../../../../model/sharing/notice";
@Component({
  moduleId: module.id,
  selector: "ideal-new-notice-form",
  templateUrl: "new-notice-form.component.html"
})
export class NewNoticeFormComponent implements OnInit {
  @Output("noticeReady") noticeReady: EventEmitter<Notice> = new EventEmitter<Notice>();
  _sharable: Sharable;
  notice: NewPackageNotice;

  constructor(private noticeService: NoticeService) {

  }

  @Input("sharable") set sharable(sharable: Sharable) {
    this._sharable = sharable;
    if (this.notice != null)
      this.notice.pckg.sharable = sharable;
  }

  ngOnInit(): void {
    this.notice = new NewPackageNotice();
    this.notice.pckg = new Package();
    this.notice.pckg.sharable = this._sharable;
  }

  public save(notice: Notice): void {
    this.noticeService.addNotice(notice).subscribe((n: NewPackageNotice) => {
      this.notice = n;
      this.noticeReady.emit(this.notice);
    });
  }
}
