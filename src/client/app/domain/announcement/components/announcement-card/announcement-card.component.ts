/**
 * Created by AKuzmanoski on 09/01/2017.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {Package} from "../../../model/sharing/package";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-card",
  templateUrl: "announcement-card.component.html"
})
export class AnnouncementCardComponent implements OnInit {
  @Input("announcement") announcement: Announcement;
  @Output("openContent") openContent: EventEmitter<Announcement> = new EventEmitter<Announcement>()

  ngOnInit(): void {
  }

  getContent() {
    this.openContent.emit(this.announcement)
  }
}
