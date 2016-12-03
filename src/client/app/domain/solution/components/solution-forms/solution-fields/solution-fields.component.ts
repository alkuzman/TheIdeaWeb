/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, Output, EventEmitter, Input} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../../../shared/abstract-value-accessor";
import {Solution} from "../../../../model/ideas/solution";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-fields",
  templateUrl: "solution-fields.component.html",
  providers: [MakeProvider(SolutionFieldsComponent)]
})
export class SolutionFieldsComponent extends AbstractValueAccessor<Solution> {
  @Input("bodyLabel") bodyLabel:string = "Solution Body";
  @Input("problemTitleLabel") problemTitleLabel:string = "Problem Title";
  @Input("ideaTitleLabel") ideaTitleLabel:string = "Idea Title";
  @Input("problemBodyLabel") problemBodyLabel:string = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel:string = "Problem Tags";
  @Input("ideaSnackPeakLabel") ideaSnackPeakLabel:string = "Snack Peak";
  @Input("tagsLabel") tagsLabel = "Solution Tags Label";
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;

  constructor() {
    super(new Solution);
  }

  ngOnInit(): void {

  }
}
