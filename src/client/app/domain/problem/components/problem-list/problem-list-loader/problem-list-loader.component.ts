/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProblemService} from "../../../problem.service";
import {Problem} from "../../../../model/ideas/problem";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list-loader",
  template: `<ideal-problem-list *ngIf="problems" [problems]="problems" (problemSelected)="onProblemSelected($event)"></ideal-problem-list>`
})
export class ProblemListLoaderComponent {
  @Input("questionerId") questionerId: number;
  problems: Problem[];
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();

  constructor(private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.problemService.getProblems({
      questionerId: this.questionerId != null ? this.questionerId.toString() : null
    }).subscribe(
      problems => this.problems = problems);
  }

  onProblemSelected(problem: Problem) {
    this.problemSelected.emit(problem);
  }
}
