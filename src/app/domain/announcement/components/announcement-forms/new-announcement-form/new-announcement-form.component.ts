/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Announcement} from "../../../../model/sharing/announcement";
import {Shareable} from "../../../../model/sharing/shareable";
import {Contract} from "../../../../model/ideas/contract";
import {Package} from "../../../../model/sharing/package";
import {AnnouncementService} from "../../../../services/announcement/announcement.service";
@Component({
  moduleId: module.id,
  selector: "ideal-new-announcement-form",
  template: `
    <ideal-announcement-form [announcement]='announcement'
                             (announcementReady)="saveAnnouncement($event)"></ideal-announcement-form>`
})
export class NewAnnouncementFormComponent implements OnInit {
  announcement: Announcement;
  _sharable: Shareable;
  _contracts: Contract[];
  @Output("announcementCreated") announcementCreated: EventEmitter<Announcement> = new EventEmitter<Announcement>();

  constructor(private announcementService: AnnouncementService) {

  }

  @Input("sharable") set sharable(sharable: Shareable) {
    this._sharable = sharable;
    this.update();
  }

  @Input("contracts") set contracts(contracts: Contract[]) {
    this._contracts = contracts;
    this.update();
  }


  ngOnInit(): void {
    this.setup();
  }

  setup() {
    this.announcement = new Announcement;
    this.announcement.pckg = new Package();
    this.announcement.pckg.shareable = this._sharable;
    this.announcement.pckg.contracts = this._contracts;
  }

  update() {
    if (this.announcement) {
      this.announcement.pckg.shareable = this._sharable;
      this.announcement.pckg.contracts = this._contracts;
    }
  }

  saveAnnouncement(announcement: Announcement) {
    this.announcementService.save(announcement).subscribe((announcement: Announcement) => {
      this.announcement = announcement;
      this.announcementCreated.emit(this.announcement);
    })
  }
}
