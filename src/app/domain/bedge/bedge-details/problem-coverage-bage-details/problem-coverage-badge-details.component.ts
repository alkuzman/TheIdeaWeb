/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, Input} from "@angular/core";
import {ProblemCoverageBadge} from "../../../model/awards/badges/problem-coverage-badge";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-coverage-badge-details",
  templateUrl: "problem-coverage-badge-details.component.html"
})
export class ProblemCoverageBadgeDetailsComponent {
  @Input("badge") badge: ProblemCoverageBadge;
}
