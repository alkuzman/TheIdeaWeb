/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component} from "@angular/core";
import {Problem} from "../../../domain/model/ideas/problem";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "ideal-problems-page",
  templateUrl: "problems-page.component.html"
})
export class ProblemsPageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  openProblemDetails(problem: Problem) {
    this.router.navigate([problem.id], {relativeTo: this.route});
  }
}
