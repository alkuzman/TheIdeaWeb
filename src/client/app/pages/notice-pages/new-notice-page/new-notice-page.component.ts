/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Sharable} from "../../../domain/model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-new-notice-page",
  templateUrl: "new-notice-page.component.html"
})
export class NewNoticePageComponent implements OnInit {
  private sharable: Sharable;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {sharable: Sharable}) => {
      this.sharable = data.sharable;
    });
  }
}
