import {Component, Input, OnInit} from '@angular/core';
import {Notice} from "../../../../model/sharing/notice";

@Component({
  selector: 'ideal-new-package-notice-card',
  templateUrl: './new-package-notice-card.component.html',
  styleUrls: ['./new-package-notice-card.component.css']
})
export class NewPackageNoticeCardComponent implements OnInit {

  @Input("notice") notice: Notice;
  @Input("opened") opened: boolean;

  constructor() { }

  ngOnInit() {
  }
}
