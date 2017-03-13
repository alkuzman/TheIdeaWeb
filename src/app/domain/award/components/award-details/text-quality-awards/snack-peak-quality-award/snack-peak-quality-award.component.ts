/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, Input} from "@angular/core";
import {SnackPeakQualityAward} from "../../../../../model/awards/snack-peak-quality-award";
@Component({
  moduleId: module.id,
  selector: "ideal-snack-peak-quality-award",
  templateUrl: "snack-peak-quality-award.component.html"
})
export class SnackPeakQualityAwardComponent {
  @Input("award") award: SnackPeakQualityAward;
}
