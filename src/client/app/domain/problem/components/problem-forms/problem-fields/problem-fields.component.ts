/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, EventEmitter, Output, OnInit, Input} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../../../shared/abstract-value-accessor";
import {Problem} from "../../../../model/ideas/problem";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-fields",
  templateUrl: "problem-fields.component.html",
  providers: [MakeProvider(ProblemFieldsComponent)]
})
export class ProblemFieldsComponent extends AbstractValueAccessor<Problem> implements OnInit {
  @Input("titleLabel") titleLabel:string = "Title";
  @Input("bodyLabel") bodyLabel:string = "Problem Body";
  @Input("tagsLabel") tagsLabel:string = "Tags";

  constructor() {
    super(new Problem());
  }

  ngOnInit(): void {

  }
}
