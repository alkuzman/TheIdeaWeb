/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, EventEmitter, Output, OnInit, Input} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-fields",
  templateUrl: "problem-fields.component.html"
})
export class ProblemFieldsComponent implements OnInit {
  @Input("titleLabel") titleLabel:string = "Title";
  @Input("bodyLabel") bodyLabel:string = "Problem Body";
  @Input("tagsLabel") tagsLabel:string = "Tags";
  @Output("problemChange") problemChange: EventEmitter<Problem>;
  private problem: Problem;

  constructor() {
    this.problemChange = new EventEmitter<Problem>();
  }

  ngOnInit(): void {
    if (this.problem == null) {
      this.problem = new Problem();
    }
  }

  //get accessor
  get value(): Problem {
    return this.problem;
  };

  //set accessor including call the onchange callback
  set value(v: Problem) {
    if (v == null) {
      this.problem = new Problem();
      this.onChange();
    }
    else if (v !== this.problem) {
      this.problem = v;
    }
  }

  onChange() {
    this.problemChange.emit(this.problem);
  }
}
