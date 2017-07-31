import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {Problem} from "../../../domain/model/ideas/problem";
import {Idea} from "../../../domain/model/ideas/idea";
import {Shareable} from "../../../domain/model/sharing/shareable";
import {Organization} from "../../../domain/model/authentication/organization";
import {RedirectService} from "../../../core/navigation/redirect.service";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-details-page",
  templateUrl: "user-details-page.component.html"
})
export class UserDetailsPageComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private redirectService: RedirectService) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
    });
  }

  goToIdeaDetails(idea: Idea) {
    this.redirectService.getIdeaDetails(idea.id);
  }

  announce(sharable: Shareable) {
    this.redirectService.newAnnouncement(sharable);
  }

  sendTo(sharable: Shareable) {
    this.redirectService.sendTo(sharable);
  }

  share(sharable: Shareable) {

  }

  edit(idea: Idea) {

  }

  report(sharable: Shareable) {

  }

  ban(sharable: Shareable) {

  }

  onProblemSelected(problem: Problem) {
    this.redirectService.getProblemDetails(problem.id);
  }

  onUserSelected(user: User) {
    this.redirectService.getUserDetails(user.id);
  }

  onOrganizationSelected(organization: Organization) {

  }

  remove(sharable: Shareable) {

  }

}
