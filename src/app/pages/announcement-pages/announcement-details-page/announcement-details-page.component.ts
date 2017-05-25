import {Component, OnInit} from "@angular/core";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {ActivatedRoute} from "@angular/router";
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-details-page",
  templateUrl: "announcement-details-page.component.html"
})
export class AnnouncementDetailsPageComponent implements OnInit {
  announcement: Announcement;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { announcement: Announcement }) => {
      this.announcement = data.announcement;
    });
  }
}
