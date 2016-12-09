/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {Component, Input} from "@angular/core";
import {Problem} from "../../../../model/ideas/problem";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-details",
  templateUrl: "problem-details.component.html"
})
export class ProblemDetailsComponent {
  @Input("problem") problem: Problem;

}
