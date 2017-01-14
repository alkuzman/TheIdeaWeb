/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Announcement} from "../../../domain/model/sharing/announcement";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-feed-page",
  templateUrl: "announcement-feed-page.component.html"
})
export class AnnouncementFeedPageComponent implements OnInit{
  private announcementList: Announcement[];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {announcementList: Announcement[]}) => {
      this.announcementList = data.announcementList;
    });
  }
}
