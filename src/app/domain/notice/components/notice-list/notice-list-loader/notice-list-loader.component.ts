import {Component, OnInit} from "@angular/core";
import {NoticeService} from "../../../../services/notice/notice.service";
import {Notice} from "../../../../model/sharing/notice";
/**
 * Created by Viki on 3/2/2017.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-notice-list-loader',
  templateUrl: 'notice-list-loader.component.html'
})
export class NoticeListLoaderComponent implements OnInit {
  noticeList: Notice[];

  constructor(private noticeService: NoticeService) {
  }

  ngOnInit() {
    this.noticeService.getAnnouncementList().subscribe((notices: Notice[]) => {
      this.noticeList = notices;
    });
  }
}
