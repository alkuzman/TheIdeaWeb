/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Problem} from "../../../domain/model/ideas/problem";
import {Idea} from "../../../domain/model/ideas/idea";
import {MdSnackBar} from "@angular/material";
import {Solution} from "../../../domain/model/ideas/solution";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-details-page",
  templateUrl: "problem-details-page.component.html"
})
export class ProblemDetailsPageComponent implements OnInit{
  problem: Problem;
  ideaList: Idea[];

  constructor(private snackBar: MdSnackBar, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {problem: Problem}) => {
      this.problem = data.problem;
    })
  }

  onIdeaListReady(ideaList: Idea[]) {
    this.ideaList = ideaList;
  }

  onSolutionReady(solution: Solution) {
    this.snackBar.open("Idea successfully created!", undefined, {duration: 2000});
    this.router.navigate(["/ideas", solution.idea.id]);
  }

  announce() {
    this.router.navigate(["/announcements", "new"], {queryParams: {sharableId: this.problem.id}});
  }
}
