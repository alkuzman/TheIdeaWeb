import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../problem.service";
import {ValueAccessorDirective} from "../../../text-editor/directives/value-accessor.directive";
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

  ngOnInit(): void {
    if (this.problem == null) {
      this.problem = new Problem();
    }
  }

  save(): boolean {
    this.problemReady.emit(this.problem);
    return true;
  }

  clearForm(): void {
    this.problem = new Problem();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
