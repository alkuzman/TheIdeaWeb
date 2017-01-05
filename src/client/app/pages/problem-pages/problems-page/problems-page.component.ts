/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Problem} from "../../../domain/model/ideas/problem";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "ideal-problems-page",
  templateUrl: "problems-page.component.html"
})
export class ProblemsPageComponent implements OnInit{
  private problems: Problem[];

  constructor(private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.data.subscribe((data: {problems: Problem[]}) => {
      this.problems = data.problems;
    });
  }

  openProblemDetails(problem: Problem) {
    this.router.navigate([problem.id], {relativeTo: this.route});
  }
}
