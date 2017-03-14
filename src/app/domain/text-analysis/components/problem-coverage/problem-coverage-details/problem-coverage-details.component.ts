/**
 * Created by AKuzmanoski on 13/03/2017.
 */
import {Component, Input} from "@angular/core";
import {ProblemCoverage} from "../../../../model/analyzers/analysis/problem-coverage";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-coverage-details",
  templateUrl: "problem-coverage-details.component.html"
})
export class ProblemCoverageDetailsComponent {
  @Input("problemCoverage") problemCoverage: ProblemCoverage;

}
