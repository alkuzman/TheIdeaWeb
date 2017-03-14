/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AwardItemComponent} from "./components/award-item/award-item.component";
import {AwardListComponent} from "./components/award-list/award-list.component";
import {BadgeModule} from "../bedge/badge.module";
import {AwardDetailsComponent} from "./components/award-details/award-details.component";
import {AwardDetailsDialogComponent} from "./components/award-details/dialog/award-details-dialog.component";
import {ProblemCoverageAwardComponent} from "./components/award-details/text-quality-awards/problem-coverage-award/problem-coverage-award.component";
import {SnackPeakQualityAwardComponent} from "./components/award-details/text-quality-awards/snack-peak-quality-award/snack-peak-quality-award.component";
import {TextQualityModule} from "../text-analysis/text-quality.module";
@NgModule({
  imports: [SharedModule, BadgeModule, TextQualityModule],
  declarations: [ProblemCoverageAwardComponent, SnackPeakQualityAwardComponent, AwardDetailsComponent, AwardDetailsDialogComponent, AwardItemComponent, AwardListComponent],
  exports: [ProblemCoverageAwardComponent, SnackPeakQualityAwardComponent,AwardDetailsComponent, AwardDetailsDialogComponent, AwardItemComponent, AwardListComponent],
  entryComponents: [AwardDetailsDialogComponent]
})
export class AwardModule {

}
