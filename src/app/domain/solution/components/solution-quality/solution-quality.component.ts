/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component, Input} from '@angular/core';
import {SolutionQuality} from '../../../model/analyzers/analysis/solution-quality';
import {SolutionQualityStatus} from '../../../model/analyzers/analysis/solution-quality-status';
import {MatDialog} from '@angular/material';
import {Award} from '../../../model/awards/award';
import {AwardService} from '../../../services/award/award.service';
import {Badge} from '../../../model/awards/badges/badge';
import {AbstractValueAccessor, MakeProvider} from '../../../../shared/abstract-value-accessor';

@Component({
  moduleId: module.id,
  selector: 'ideal-solution-quality',
  templateUrl: 'solution-quality.component.html',
  providers: [MakeProvider(SolutionQualityComponent)]
})
export class SolutionQualityComponent extends AbstractValueAccessor<Award<Badge<any, any>>[]> {
  awards: Award<Badge<any, any>>[];

  _solutionQuality: SolutionQuality;

  constructor(public dialog: MatDialog, private awardService: AwardService) {
    super([]);
  }

  @Input('solutionQuality') set solutionQuality(solutionQuality: SolutionQuality) {
    this._solutionQuality = solutionQuality;
    if (solutionQuality != null) {
      this.updateAwards();
    } else {
      this.awards = [];
    }
  }

  updateAwards(): void {
    this.awards = [];
    this.awardService.generateAwards(this._solutionQuality).subscribe((awards: Award<Badge<any, any>>[]) => {
      this.awards = awards;
      this.value = [];
      for (const award of awards) {
        if (award.badge.id != null) {
          this.value.push(award);
        }
      }
      this.notify();
    });
  }

  public getQualityStatusName(qualityStatus: SolutionQualityStatus): string {
    if (qualityStatus == null) {
      return null;
    }
    return SolutionQualityStatus[qualityStatus];
  }
}
