/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Idea} from "../../../domain/model/ideas/idea";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {Problem} from "../../../domain/model/ideas/problem";
@Component({
  moduleId: module.id,
  selector: "ideal-ideas-page",
  templateUrl: "ideas-page.component.html"
})
export class IdeasPageComponent implements OnInit {
  private ideas: Idea[];

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {ideas: Idea[]}) => {
      this.ideas = data.ideas;
    })
  }

  goToDetails(idea: Idea) {
    this.router.navigate([idea.id], {relativeTo: this.route})
  }

  goToUserDetails(user: User) {
    this.router.navigate(["/users", user.id]);
  }

  goToProblemDetails(problem: Problem) {
    console.log("Here");
    this.router.navigate(["/problems", problem.id]);
  }
}
