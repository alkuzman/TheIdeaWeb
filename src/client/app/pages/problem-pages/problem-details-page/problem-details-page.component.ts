/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Problem} from "../../../core/model/ideas/problem";
import {ProblemService} from "../../../core/problem/problem.service";
import {Idea} from "../../../core/model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-details-page",
  templateUrl: "problem-details-page.component.html"
})
export class ProblemDetailsPageComponent implements OnInit{
  problemId: number;
  problem: Problem;
  ideaList: Idea[];

  constructor(private route: ActivatedRoute, private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.problemId = + params['id'];
    });
  }

  onProblemReady(problem: Problem) {
    console.log(problem);
    this.problem = problem;
  }

  onIdeaListReady(ideaList: Idea[]) {
    this.ideaList = ideaList;
  }
}
