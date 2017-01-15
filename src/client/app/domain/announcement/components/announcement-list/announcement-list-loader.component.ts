/**
 * Created by AKuzmanoski on 15/01/2017.
 */
import {Component, OnInit, Input} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {AnnouncementService} from "../../../services/announcement/announcement.service";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-list-loader",
  template: "<ideal-announcement-list *ngIf='announcementList' [announcementList]='announcementList'></ideal-announcement-list>"
})
export class AnnouncementListLoaderComponent implements OnInit{
  @Input("ownerId") ownerId: number;
  private announcementList: Announcement[];

  constructor(private announcementService: AnnouncementService) {

  }

  ngOnInit(): void {
    this.announcementService.getAnnouncementList({ownerId: this.ownerId.toString()}).subscribe((value: Announcement[]) => {
      this.announcementList = value;
    });
  }
}
