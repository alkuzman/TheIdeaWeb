import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../problem.service";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-problem-form',
  templateUrl: 'problem-form.component.html',
  styleUrls: ['problem-form.component.css'],
})
export class ProblemFormComponent implements OnInit {
  @Input("submitText") submitText = "Submit";
  @Input("problem") problem: Problem;
  @Output("problemReady") problemReady: EventEmitter<Problem> = new EventEmitter<Problem>();
  active = true;
  errorMessage: any;

  constructor(private problemService: ProblemService) {

  }

  ngOnInit(): void {
    if (this.problem == null) {
      this.problem = new Problem();
    }
  }

  save(): boolean {
    console.log(this.problem);
    this.problemService.addProblem(this.problem)
      .then(
        problem => this.problemCreated(problem),
        error => this.errorMessage = <any>error
      );
    return true;
  }

  problemCreated(problem: Problem):void {
    this.problem = problem;
    this.problemReady.emit(this.problem);
  }

  clearForm(): void {
    this.problem = new Problem();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
