/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Sharable} from "../../../domain/model/sharing/sharable";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Notice} from "../../../domain/model/sharing/notice";
@Component({
  moduleId: module.id,
  selector: "ideal-new-notice-page",
  templateUrl: "new-notice-page.component.html"
})
export class NewNoticePageComponent implements OnInit {
  private sharable: Sharable;

  constructor(private route: ActivatedRoute, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {sharable: Sharable}) => {
      this.sharable = data.sharable;
    });
  }

  onNoticeReady(notice: Notice) {
    this.snackBar.open("Notice with id: " + notice.id, undefined, <MdSnackBarConfig>{duration: 3000});
  }
}
