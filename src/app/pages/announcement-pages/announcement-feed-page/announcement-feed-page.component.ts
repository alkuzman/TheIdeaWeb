/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {
  Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ChangeDetectionStrategy,
  HostBinding, HostListener, ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {ScrollService} from "../../../core/scrolling/scroll-service";
import {AnnouncementService} from "../../../domain/services/announcement/announcement.service";
import {RedirectService} from "../../../core/navigation/redirect.service";
import {Idea} from "../../../domain/model/ideas/idea";
import {Problem} from "../../../domain/model/ideas/problem";
import {User} from "../../../domain/model/authentication/user";
import {ThemingService} from "../../../core/theming/theming.service";
import {
  animate, animateChild, AnimationEvent, group, query, state, style, transition, trigger,
  useAnimation
} from "@angular/animations";
import {scaleIn, scaleOut} from "../../../core/animations/scale-animations";
import {Shareable} from "../../../domain/model/sharing/shareable";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-feed-page",
  templateUrl: "announcement-feed-page.component.html",
  styleUrls: ["announcement-feed-page.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('pageAnimation', [
      transition(':enter',
        query('@fab', useAnimation(scaleIn))),
      transition(':leave',
        query('[mat-fab]', useAnimation(scaleOut)))
    ]),
    trigger("fab", [
      state("void", style({
        transform: "scale(0)"
      })),
      transition(':enter', group([
        useAnimation(scaleIn), animateChild()])),
      transition(':leave', group([
        useAnimation(scaleOut), animateChild()]))
    ])
  ]
})
export class AnnouncementFeedPageComponent implements OnInit, OnDestroy {

  @HostBinding("@pageAnimation") animation = true;

  @HostBinding("style.display") get display() {
    return "block";
  }

  announcementList: Announcement[];
  page = 1;
  pageSize: number;
  type: string;
  query: string;
  noMoreResults = false;
  additionUrl: string;

  constructor(private route: ActivatedRoute, private scrollService: ScrollService,
              private announcementService: AnnouncementService, private redirectService: RedirectService,
              private themingService: ThemingService) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { announcementList: Announcement[], pageSize: number, type: string }) => {
      this.announcementList = data.announcementList;
      this.pageSize = data.pageSize;
      this.type = data.type;
      if (this.type != null) {
        if (this.type === "Idea") {
          this.additionUrl = "/ideas/new";
          this.themingService.currentTheme = "idea-theme";
        } else if (this.type === "Problem") {
          this.additionUrl = "/problems/new";
          this.themingService.currentTheme = "problem-theme";
        }
      } else {
        this.additionUrl = "/ideas/new";
        this.themingService.currentTheme = "default-theme";
      }
    });
    this.route.queryParams.subscribe((params: { query: string }) => {
      const isNew = this.query != null;
      this.query = params.query;
      if (isNew) {
        this.loadData();
      }
    });
    this.scrollService.scrollEvent.subscribe(() => this.loadMore());
  }

  loadData(): void {
    this.page = 0;
    const offset = this.page * this.pageSize;
    this.announcementService.getAnnouncementList({
      type: this.type,
      query: this.query,
      offset: offset.toString(),
      limit: this.pageSize.toString()
    })
      .subscribe((announcementList: Announcement[]) => {
        this.announcementList = announcementList;
        this.page += 1;
        if (announcementList.length < this.pageSize) {
          this.noMoreResults = true;
        }
      });
  }

  ngOnDestroy(): void {

  }

  loadMore(): void {
    if (this.noMoreResults) {
      return;
    }
    const offset = this.page * this.pageSize;
    this.announcementService.getAnnouncementList({
      type: this.type,
      query: this.query,
      offset: offset.toString(),
      limit: this.pageSize.toString()
    })
      .subscribe((announcementList: Announcement[]) => {
        this.page += 1;
        this.announcementList = this.announcementList.concat(announcementList);
        if (announcementList.length < this.pageSize) {
          this.noMoreResults = true;
        }
      });
  }

  onAnnouncementSelected(announcement: Announcement): void {
    this.redirectService.getAnnouncementDetails(announcement.id);
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

  onAnnounce(sharable: Shareable): void {
    this.redirectService.newAnnouncement(sharable);
  }

  onBan(sharable: Shareable): void {

  }

  onReport(sharable: Shareable): void {
  }

  onRemove(sharable: Shareable): void {
  }

  onShare(sharable: Shareable): void {
  }

  onSendTo(sharable: Shareable): void {
    this.redirectService.sendTo(sharable);
  }

  getContent(announcement: Announcement): void {
    this.redirectService.getAnnouncementDetails(announcement.id);
  }
}
