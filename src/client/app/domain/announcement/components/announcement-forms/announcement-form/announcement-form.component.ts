/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Announcement} from "../../../../model/sharing/announcement";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-form",
  templateUrl: "announcement-form.component.html"
})
export class AnnouncementFormComponent {
  @Input("announcement") announcement: Announcement;
  @Output("announcementReady") announcementReady: EventEmitter<Announcement> = new EventEmitter<Announcement>();

  save(): void {
    console.log("HERE");
    this.announcementReady.emit(this.announcement);
  }
}
