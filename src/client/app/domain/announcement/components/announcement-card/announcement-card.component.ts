/**
 * Created by AKuzmanoski on 09/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-card",
  templateUrl: "announcement-card.component.html"
})
export class AnnouncementCardComponent implements OnInit {
  @Input("announcement") announcement: Announcement;

  ngOnInit(): void {

  }
}
