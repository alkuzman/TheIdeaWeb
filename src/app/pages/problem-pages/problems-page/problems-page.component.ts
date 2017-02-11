/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Problem} from "../../../domain/model/ideas/problem";
import {Router, ActivatedRoute} from "@angular/router";
import {RedirectService} from "../../../core/navigation/redirect.service";
import {Organization} from "../../../domain/model/authentication/organization";
import {User} from "../../../domain/model/authentication/user";
@Component({
  moduleId: module.id,
  selector: "ideal-problems-page",
  templateUrl: "problems-page.component.html"
})
export class ProblemsPageComponent implements OnInit {
  private problems: Problem[];

  constructor(private router: Router, private route: ActivatedRoute, private redirectService: RedirectService) {
  }


  ngOnInit(): void {
    this.route.data.subscribe((data: {problems: Problem[]}) => {
      this.problems = data.problems;
    });
  }

  openProblemDetails(problem: Problem) {
    this.router.navigate([problem.id], {relativeTo: this.route});
  }

  onUserSelected(user: User) {
    this.redirectService.getUserDetails(user.id);
  }

  onOrganizationSelected(organization: Organization) {
    this.redirectService.getOrganizationDetails(organization);
  }

  onAnnounce(problem: Problem) {
    this.redirectService.newAnnouncement(problem);
  }

  onSendTo(problem: Problem) {
    this.redirectService.sendTo(problem);
  }

  onEdit(problem: Problem) {

  }

  onRemove(problem: Problem) {

  }

  onShare(problem: Problem) {

  }

  onReport(problem: Problem) {

  }

  onBan(problem: Problem) {

  }
}
