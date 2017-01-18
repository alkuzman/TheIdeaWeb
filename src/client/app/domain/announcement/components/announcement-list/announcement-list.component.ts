import {
  Component, Input, trigger, state, style, transition, animate, OnInit, Output,
  EventEmitter
} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {Scheduler} from "rxjs";
import {Package} from "../../../model/sharing/package";
/**
 * Created by AKuzmanoski on 08/01/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-list",
  templateUrl: "announcement-list.component.html",
  animations: [
    trigger('loading', [
      state('init', style({
        opacity: 0,
        transform: 'translateY(10px)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition("init => active", [

        animate("160ms ease-out", style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition("active => init", [
        animate("150ms ease-in", style({
          opacity: 0,
          transform: 'translateY(10px)'
        }))
      ])
    ])
  ]
})
export class AnnouncementListComponent implements OnInit {
  @Input("announcementList") announcementList: Announcement[];
  @Output("openContent") openContent: EventEmitter<Announcement> = new EventEmitter<Announcement>();
  private status: string[] = [];

  ngOnInit(): void {
    let queueRefresh = Scheduler.queue;
    this.announcementList.forEach((item, index) => {
      this.status[index] = "init";
      let timeout = (index * 40);
       queueRefresh.schedule(() => {
         this.changeStatus(index);
       }, timeout);
    });
  }

  changeStatus(index: number) {
    this.status[index] = "active";
  }

  getContent(announcement: Announcement) {
    this.openContent.emit(announcement);
  }

}
