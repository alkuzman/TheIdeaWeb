/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {ScrollService} from "../../../core/scrolling/scroll-service";
import {AnnouncementService} from "../../../domain/services/announcement/announcement.service";
import {RedirectService} from "../../../core/navigation/redirect.service";
import {Sharable} from "../../../domain/model/sharing/sharable";
import {Idea} from "../../../domain/model/ideas/idea";
import {Problem} from "../../../domain/model/ideas/problem";
import {User} from "../../../domain/model/authentication/user";
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
  private query: string;
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
    this.route.queryParams.subscribe((params: {query: string}) => {
      let isNew = this.query != null;
      this.query = params.query;
      if (isNew) {
        this.loadData();
      }
    });
    this.scrollService.scrollEvent.subscribe(() => this.loadMore());
  }

  loadData(): void {
    this.page = 0;
    let offset = this.page * this.pageSize;
    this.announcementService.getAnnouncementList({
      type: this.type,
      query: this.query,
      offset: offset.toString(),
      limit: this.pageSize.toString()
    })
      .subscribe((announcementList: Announcement[]) => {
        this.announcementList = announcementList;
        this.page += 1;
        if (announcementList.length < this.pageSize)
          this.noMoreResults = true;
      });
  }

  ngOnDestroy(): void {

  }

  private loadMore(): void {
    if (this.noMoreResults)
      return;
    let offset = this.page * this.pageSize;
    this.announcementService.getAnnouncementList({
      type: this.type,
      query: this.query,
      offset: offset.toString(),
      limit: this.pageSize.toString()
    })
      .subscribe((announcementList: Announcement[]) => {
        this.page += 1;
        this.announcementList = this.announcementList.concat(announcementList);
        if (announcementList.length < this.pageSize)
          this.noMoreResults = true;
      });
  }

  onAnnouncementSelected(announcement: Announcement): void {
    this.redirectService.getAnnouncemntDetails(announcement.id);
  }

  onIdeaSelected(idea: Idea) {
    this.redirectService.getIdeaDetails(idea.id);
  }

  onIdeaEdit(idea: Idea) {

  }

  onProblemSelected(problem: Problem) {
    this.redirectService.getProblemDetails(problem.id);
  }

  onUserSelected(user: User) {
    this.redirectService.getUserDetails(user.id);
  }

  onAnnounce(sharable: Sharable): void {
    this.redirectService.newAnnouncement(sharable);
  }

  onBan(sharable: Sharable): void {

  }

  onReport(sharable: Sharable): void {
  }

  onRemove(sharable: Sharable): void {
  }

  onShare(sharable: Sharable): void {
  }

  onSendTo(sharable: Sharable): void {
  }

  getContent(announcement: Announcement): void {
    this.redirectService.getAnnouncemntDetails(announcement.id);
  }
}
