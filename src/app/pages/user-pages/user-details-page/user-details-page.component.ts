import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {Problem} from "../../../domain/model/ideas/problem";
import {Idea} from "../../../domain/model/ideas/idea";
import {Sharable} from "../../../domain/model/sharing/sharable";
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
  private user: User;

  constructor(private route: ActivatedRoute, private router: Router, private redirectService: RedirectService) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
    });
  }

  goToIdeaDetails(idea: Idea) {
    this.redirectService.getIdeaDetails(idea.id);
  }

  announce(sharable: Sharable) {
    this.redirectService.newAnnouncement(sharable);
  }

  sendTo(sharable: Sharable) {
    this.redirectService.sendTo(sharable);
  }

  share(sharable: Sharable) {

  }

  edit(idea: Idea) {

  }

  report(sharable: Sharable) {

  }

  ban(sharable: Sharable) {

  }

  onProblemSelected(problem: Problem) {
    this.redirectService.getProblemDetails(problem.id);
  }

  onUserSelected(user: User) {
    this.redirectService.getUserDetails(user.id);
  }

  onOrganizationSelected(organization: Organization) {

  }

}
