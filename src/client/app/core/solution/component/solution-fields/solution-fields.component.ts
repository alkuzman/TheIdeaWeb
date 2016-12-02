/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, Output, EventEmitter, Input} from "@angular/core";
import {Solution} from "../../../model/ideas/solution";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-fields",
  templateUrl: "solution-fields.component.html"
})
export class SolutionFieldsComponent {
  @Input("bodyLabel") bodyLabel:string = "Solution Body";
  @Input("problemTitleLabel") problemTitleLabel:string = "Problem Title";
  @Input("ideaTitleLabel") ideaTitleLabel:string = "Idea Title";
  @Input("problemBodyLabel") problemBodyLabel:string = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel:string = "Problem Tags";
  @Input("ideaSnackPeakLabel") ideaSnackPeakLabel:string = "Snack Peak";
  @Input("tagsLabel") tagsLabel = "Solution Tags Label";
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Output("solutionChange") solutionChange: EventEmitter<Solution>;
  private solution: Solution;

  constructor() {
    this.solutionChange = new EventEmitter<Solution>();
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
    if (v == null) {
      this.solution = new Solution();
      this.onChange();
    }
    else {
      this.solution = v;
    }
  }

  onChange() {
    this.solutionChange.emit(this.solution);
  }
}
