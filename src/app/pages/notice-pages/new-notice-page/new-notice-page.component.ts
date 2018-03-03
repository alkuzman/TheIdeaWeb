/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Shareable} from "../../../domain/model/sharing/shareable";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {Notice} from "../../../domain/model/sharing/notice";
@Component({
  moduleId: module.id,
  selector: "ideal-new-notice-page",
  templateUrl: "new-notice-page.component.html"
})
export class NewNoticePageComponent implements OnInit {
  sharable: Shareable;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { sharable: Shareable }) => {
      this.sharable = data.sharable;
    });
  }

  onNoticeReady(notice: Notice) {
    this.snackBar.open("Notification sent", undefined, <MatSnackBarConfig>{duration: 3000});
  }
}
