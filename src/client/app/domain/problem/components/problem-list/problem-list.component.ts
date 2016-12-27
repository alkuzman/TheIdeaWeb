/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../problem.service";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list",
  templateUrl: "problem-list.component.html",
  styleUrls: ["problem-list.component.css"]
})
export class ProblemListComponent implements OnInit{
  @Input("questionerId") questionerId: number;
  @Input("problems") problems: Problem[];
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();
  errorMessage: string;

  constructor(private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.problemService.getProblems({
      questionerId: this.questionerId != null ? this.questionerId.toString() : null
    }).subscribe(
      problems => this.problems = problems,
      error => this.errorMessage = <any>error);
  }

  onProblemSelected(problem: Problem) {
    this.problemSelected.emit(problem);
  }
}
