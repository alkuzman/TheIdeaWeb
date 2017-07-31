/**
 * Created by AKuzmanoski on 02/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Shareable} from "../../../domain/model/sharing/shareable";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {MdSnackBar} from "@angular/material";
@Component({
  moduleId: module.id,
  selector: "ideal-new-announcement-page",
  template: `
    <ideal-new-announcement-form [sharable]="sharable"
                                 (announcementCreated)="onAnnouncementCreated($event)"></ideal-new-announcement-form>`
})
export class NewAnnouncementPageComponent implements OnInit {
  sharable: Shareable;

  constructor(private route: ActivatedRoute, private snackBar: MdSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { sharable: Shareable }) => {
      this.sharable = data.sharable;
    });
  }

  onAnnouncementCreated(announcement: Announcement) {
    this.openSnackBar("Announcement created", "Close");
    this.goToDetails(announcement);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  goToDetails(announcement: Announcement) {
    this.router.navigate(["/announcements", announcement.id]);
  }
}
