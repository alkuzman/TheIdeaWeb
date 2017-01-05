import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {Problem} from "../../../domain/model/ideas/problem";
import {Idea} from "../../../domain/model/ideas/idea";
import {Sharable} from "../../../domain/model/sharing/sharable";
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

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
    });
  }

  goToUserDetails(user: User) {
    this.router.navigate(["../", "user.id"], {relativeTo: this.route})
  }

  goToProblemDetails(problem: Problem) {
    this.router.navigate(["/problems", problem.id])
  }

  goToIdeaDetails(idea: Idea) {
    this.router.navigate(["/ideas", idea.id])
  }

  announce(sharable: Sharable) {
    console.log("announce");
    this.router.navigate(["/announcements", "new"], {queryParams: {sharableId: sharable.id}});
  }

  sendTo(sharable: Sharable) {

  }

  share(sharable: Sharable) {

  }

  edit(idea: Idea) {

  }

  report(sharable: Sharable) {

  }

  ban(sharable: Sharable) {

  }
}
