/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, Output, EventEmitter, OnInit, Input} from "@angular/core";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
import {Idea} from "../../../../model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-fields",
  templateUrl: "idea-fields.component.html",
  styleUrls: ["idea-fields.component.css"],
  providers: [MakeProvider(IdeaFieldsComponent)]
})
export class IdeaFieldsComponent extends AbstractValueAccessor<Idea> implements OnInit {
  @Input("sneakPeakLabel") sneakPeakLabel: string = "Sneak Peak";
  @Input("titleLabel") titleLabel: string = "Title";
  @Input("problemTitleLabel") problemTitleLabel = "Problem Title";
  @Input("problemBodyLabel") problemBodyLabel = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel = "Problem Tags";
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Input("ideaTagsLabel") ideaTagsLabel: string = "Idea Tags";

  constructor() {
    super(new Idea());
  }

  ngOnInit(): void {
  }
}
