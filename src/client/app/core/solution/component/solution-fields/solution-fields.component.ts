/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {Solution} from "../../../model/ideas/solution";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-fields",
  templateUrl: "solution-fields.component.html"
})
export class SolutionFieldsComponent {
  @Output("problemChange") problemChange: EventEmitter<Solution>;
  private solution: Solution;

  constructor() {
    this.problemChange = new EventEmitter<Solution>();
  }

  ngOnInit(): void {
    if (this.solution == null) {
      this.solution = new Solution();
    }
  }

  //get accessor
  get value(): Solution {
    return this.solution;
  };

  //set accessor including call the onchange callback
  set value(v: Solution) {
    if (v !== this.solution) {
      this.solution = v;
    }
  }

  onChange() {
    this.problemChange.emit(this.solution);
  }
}
