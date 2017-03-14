/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, Input} from "@angular/core";
import {ProblemCoverageAward} from "../../../../../model/awards/problem-coverage-award";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-coverage-award",
  templateUrl: "problem-coverage-award.component.html"
})
export class ProblemCoverageAwardComponent {
  @Input("award") award: ProblemCoverageAward;
}
