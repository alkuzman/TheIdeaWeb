import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {ProblemService} from "../../../../services/problem/problem.service";
import {Problem} from "../../../../model/ideas/problem";
import {Response} from "@angular/http";
/**
 * Created by AKuzmanoski on 14/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-load-problem-details",
  templateUrl: "load-problem-details.component.html"
})
export class LoadProblemDetailsComponent implements OnInit {
  @Input("problemId") problemId: number;
  @Output("problemReady") problemReady: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("problemNotFound") problemNotFound: EventEmitter<void> = new EventEmitter<void>();
  problem: Problem;

  constructor(private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.problemService.getProblem(this.problemId).subscribe(
      (problem: Problem) => this.onProblemReady(problem),
      (error: Response) => this.onError(error))
  }

  onProblemReady(problem: Problem): void {
    this.problem = problem;
    this.problemReady.emit(this.problem);

  }

  onError(error: Response): void {
    if (error.status == 404)
      this.problemNotFound.emit();
  }
}
