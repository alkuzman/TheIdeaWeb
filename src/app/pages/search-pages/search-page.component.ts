/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RedirectService} from "../../core/navigation/redirect.service";
import {Announcement} from "../../domain/model/sharing/announcement";
import {User} from "../../domain/model/authentication/user";
import {Idea} from "../../domain/model/ideas/idea";
import {Problem} from "../../domain/model/ideas/problem";
import {Sharable} from "../../domain/model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-search-page",
  templateUrl: "search-page.component.html"
})
export class SearchPageComponent implements OnInit {
  pageSize: number;
  query: string;

  constructor(private route: ActivatedRoute, private redirectService: RedirectService) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { pageSize: number }) => {
      this.pageSize = data.pageSize;
    });
    this.route.queryParams.subscribe((data: { query: string }) => {
      this.query = data.query;
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
    this.redirectService.sendTo(sharable);

  }
}
