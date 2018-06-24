/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component, Input} from '@angular/core';
import {SolutionQuality} from '../../../../model/analyzers/analysis/solution-quality';
import {SolutionQualityStatus} from '../../../../model/analyzers/analysis/solution-quality-status';

@Component({
  moduleId: module.id,
  selector: 'ideal-solution-quality-details',
  templateUrl: 'solution-quality-details.component.html'
})
export class SolutionQualityDetailsComponent {
  @Input('solutionQuality') solutionQuality: SolutionQuality;
  pure: SolutionQualityStatus = SolutionQualityStatus.POOR;
  fair: SolutionQualityStatus = SolutionQualityStatus.FAIR;
  good: SolutionQualityStatus = SolutionQualityStatus.GOOD;

  public getQualityStatusName(qualityStatus: SolutionQualityStatus): string {
    if (qualityStatus == null) {
      return null;
    }
    return SolutionQualityStatus[qualityStatus];
  }
}
