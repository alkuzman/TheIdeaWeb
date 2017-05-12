/**
 * Created by AKuzmanoski on 08/03/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BadgeIconResolverService} from "./badge-icon-resolver.service";
import {BadgeButtonComponent} from "./badge-button/badge-button.component";
import {ProblemCoverageBadgeDetailsComponent} from "./bedge-details/problem-coverage-bage-details/problem-coverage-badge-details.component";
import {BadgeInfoComponent} from "./badge-info/badge-info.component";
import {BadgeDescendantsComponent} from "./badge-descendants/badge-descendants.component";
import {BadgeAvatarComponent} from "./badge-avatar/badge-avatar.component";
import {BadgeSiblingsService} from "./badge-siblings.service";
import {SnackPeakQualityBadgeDetailsComponent} from "./bedge-details/snack-peak-quality-badge-details/snack-peak-quality-badge-details.component";
@NgModule({
  imports: [SharedModule],
  providers: [BadgeIconResolverService, BadgeSiblingsService],
  declarations: [BadgeDescendantsComponent, BadgeAvatarComponent, BadgeInfoComponent, ProblemCoverageBadgeDetailsComponent, SnackPeakQualityBadgeDetailsComponent, BadgeButtonComponent],
  exports: [BadgeDescendantsComponent, BadgeAvatarComponent, BadgeInfoComponent, ProblemCoverageBadgeDetailsComponent, SnackPeakQualityBadgeDetailsComponent, BadgeButtonComponent]
})
export class BadgeModule {

}
