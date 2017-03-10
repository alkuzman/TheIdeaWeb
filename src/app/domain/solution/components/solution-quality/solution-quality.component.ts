/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component, Input} from "@angular/core";
import {SolutionQuality} from "../../../model/analyzers/analysis/solution-quality";
import {SolutionQualityStatus} from "../../../model/analyzers/analysis/solution-quality-status";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {SolutionQualityDialog} from "./solution-quality-dialog/solution-quality-dialog.component";
import {Award} from "../../../model/awards/award";
import {AwardService} from "../../../services/award/award.service";
import {Badge} from "../../../model/awards/badges/badge";
import {AbstractValueAccessor, MakeProvider} from "../../../../shared/abstract-value-accessor";

@Component({
  moduleId: module.id,
  selector: "ideal-solution-quality",
  templateUrl: "solution-quality.component.html",
  providers: [MakeProvider(SolutionQualityComponent)]
})
export class SolutionQualityComponent extends AbstractValueAccessor<Award<Badge<any, any>>[]> {
  private _solutionQuality: SolutionQuality;
  private awards: Award<Badge<any, any>>[];

  @Input("solutionQuality") set solutionQuality(solutionQuality: SolutionQuality) {
    this._solutionQuality = solutionQuality;
    this.updateAwards();
  }

  updateAwards(): void {
    this.awards = [];
    this.awardService.generateAwards(this._solutionQuality).subscribe((awards: Award<Badge<any, any>>[]) => {
      this.awards = awards;
      this.value = [];
      for (let award of awards) {
        if (award.badge.id != null)
          this.value.push(award);
      }
      this.notify();
    })
  }

  constructor(public dialog: MdDialog, private awardService: AwardService) {
    super([]);
  }

  public getQualityStatusName(qualityStatus: SolutionQualityStatus): string {
    if (qualityStatus == null)
      return null;
    return SolutionQualityStatus[qualityStatus];
  }

  openDetails(): void {
    let dialogRef = this.dialog.open(SolutionQualityDialog, <MdDialogConfig>{
      disableClose: false,
      width: '',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }, data: {solutionQuality: this._solutionQuality}
    });
  }
}
