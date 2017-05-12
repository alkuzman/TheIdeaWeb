/**
 * Created by AKuzmanoski on 14/03/2017.
 */
import {Component, Input} from "@angular/core";
import {SnackPeakQuality} from "../../../model/analyzers/analysis/snack-peak-quality";
@Component({
  moduleId: module.id,
  selector: "ideal-snack-peak-quality-details",
  templateUrl: "snack-peak-quality.component.html"
})
export class SnackPeakQualityComponent {
  @Input("snackPeakQuality") snackPeakQuality: SnackPeakQuality;
}
