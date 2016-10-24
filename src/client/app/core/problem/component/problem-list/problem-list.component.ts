/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../problem.service";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list",
  templateUrl: "problem-list.component.html",
  styleUrls: ["problem-list.component.css"]
})
export class ProblemListComponent implements OnInit{
  @Input("problems") problems: Problem[];
  errorMessage: string;

  constructor(private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.problemService.getProblems().subscribe(
      problems => this.problems = problems,
      error => this.errorMessage = <any>error);
  }
}
