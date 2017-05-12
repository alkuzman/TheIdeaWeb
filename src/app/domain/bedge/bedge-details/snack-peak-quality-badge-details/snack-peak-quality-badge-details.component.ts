/**
 * Created by AKuzmanoski on 14/03/2017.
 */
import {Component, Input} from "@angular/core";
import {ProblemCoverageBadge} from "../../../model/awards/badges/problem-coverage-badge";
import {SnackPeakQualityBadge} from "../../../model/awards/badges/snack-peak-quality-badge";
@Component({
  moduleId: module.id,
  selector: "ideal-snack-peak-quality-badge-details",
  templateUrl: "snack-peak-quality-badge-details.component.html"
})
export class SnackPeakQualityBadgeDetailsComponent {
  @Input("badge") badge: SnackPeakQualityBadge;
}
