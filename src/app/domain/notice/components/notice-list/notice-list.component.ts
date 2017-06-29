import {Component, Input} from "@angular/core";
import {Notice} from "../../../model/sharing/notice";
/**
 * Created by Viki on 3/2/2017.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-notice-list',
  templateUrl: 'notice-list.component.html'
})
export class NoticeListComponent {

  @Input("noticeList") noticeList: Notice[];

  constructor() {
  }



}
