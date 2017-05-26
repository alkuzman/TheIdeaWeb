/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Idea} from "../../../domain/model/ideas/idea";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {Problem} from "../../../domain/model/ideas/problem";
import {RedirectService} from "../../../core/navigation/redirect.service";
@Component({
  moduleId: module.id,
  selector: "ideal-ideas-page",
  templateUrl: "ideas-page.component.html"
})
export class IdeasPageComponent implements OnInit {
  ideas: Idea[];

  constructor(private router: Router, private route: ActivatedRoute, private redirectService: RedirectService) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: { ideas: Idea[] }) => {
      this.ideas = data.ideas;
    })
  }

  goToDetails(idea: Idea) {
    this.redirectService.getIdeaDetails(idea.id);
  }

  goToUserDetails(user: User) {
    this.redirectService.getUserDetails(user.id)
  }

  goToProblemDetails(problem: Problem) {
    this.redirectService.getProblemDetails(problem.id);
  }

  onAnnounce(idea: Idea) {
    this.redirectService.newAnnouncement(idea);
  }

  onEdit(idea: Idea) {

  }

  onReport(idea: Idea) {

  }

  onBan(idea: Idea) {
  }

  onShare(idea: Idea) {

  }

  onSendTo(idea: Idea) {
    this.redirectService.sendTo(idea);
  }

  onRemove(idea: Idea) {

  }
}
