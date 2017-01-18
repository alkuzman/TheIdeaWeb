/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {ScrollService} from "../../../core/scrolling/scroll-service";
import {AnnouncementService} from "../../../domain/services/announcement/announcement.service";
import {Package} from "../../../domain/model/sharing/package";
import {RedirectService} from "../../../core/navigation/redirect.service";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-feed-page",
  templateUrl: "announcement-feed-page.component.html"
})
export class AnnouncementFeedPageComponent implements OnInit, OnDestroy {
  private announcementList: Announcement[];
  private page: number = 1;
  private pageSize: number;
  private type: string;
  private noMoreResults: boolean = false;

  constructor(private route: ActivatedRoute, private scrollService: ScrollService,
              private announcementService: AnnouncementService, private redirectService: RedirectService) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {announcementList: Announcement[], pageSize: number, type: string}) => {
      this.announcementList = data.announcementList;
      this.pageSize = data.pageSize;
      this.type = data.type;
    });
    this.scrollService.scrollEvent.subscribe(() => this.loadMore());
  }

  ngOnDestroy(): void {

  }

  private loadMore(): void {
    if (this.noMoreResults)
      return;
    let offset = this.page * this.pageSize;
    this.announcementService.getAnnouncementList({type: this.type, offset: offset.toString(), limit: this.pageSize.toString()})
      .subscribe((announcementList: Announcement[]) => {
        this.page += 1;
        this.announcementList = this.announcementList.concat(announcementList);
        if (announcementList.length < this.pageSize)
          this.noMoreResults = true;
      });
  }

  getContent(announcement: Announcement) {
    this.redirectService.getAnnouncemntDetails(announcement.id)
  }
}
