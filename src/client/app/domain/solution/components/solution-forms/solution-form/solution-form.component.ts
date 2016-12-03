/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-form",
  templateUrl: "solution-form.component.html"
})
export class SolutionFormComponent implements OnInit {
  @Input("submitText") submitText = "Submit";
  @Input("solution") solution: Solution;
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  active = true;

  ngOnInit(): void {
    if (this.solution == null)
      this.solution = new Solution();
  }

  save(): boolean {
    this.solutionReady.emit(this.solution);
    return true;
  }

  clearForm(): void {
    this.solution = new Solution();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
