/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, Output, EventEmitter, OnInit, Input} from "@angular/core";
import {Idea} from "../../../model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-fields",
  templateUrl: "idea-fields.component.html",
  styleUrls: ["idea-fields.component.css"]
})
export class IdeaFieldsComponent implements OnInit {
  @Input("sneakPeakLabel") sneakPeakLabel: string = "Sneak Peak";
  @Input("titleLabel") titleLabel: string = "Title";
  @Input("problemTitleLabel") problemTitleLabel = "Problem Title";
  @Input("problemBodyLabel") problemBodyLabel = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel = "Problem Tags";
  @Output("ideaChange") ideaChange: EventEmitter<Idea>;
  private idea: Idea;

  constructor() {
    this.ideaChange = new EventEmitter<Idea>();
  }

  ngOnInit(): void {
    if (this.idea == null) {
      this.idea = new Idea();
    }
  }

  //get accessor
  get value(): Idea {
    return this.idea;
  };

  //set accessor including call the onchange callback
  set value(v: Idea) {
    if (v == null) {
      this.idea = new Idea();
      this.onChange();
    }
    else {
      this.idea = v;
    }
  }

  onChange() {
    this.ideaChange.emit(this.idea);
  }
}
