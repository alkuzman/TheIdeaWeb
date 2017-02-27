/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component, Input} from "@angular/core";
import {SolutionQuality} from "../../../model/analyzers/analysis/solution-quality";
import {SolutionQualityStatus} from "../../../model/analyzers/analysis/solution-quality-status";
import {MdDialog} from "@angular/material";
import {SolutionQualityDialog} from "./solution-quality-dialog/solution-quality-dialog.component";
import {Award} from "../../../model/ideas/award";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-quality",
  templateUrl: "solution-quality.component.html"
})
export class SolutionQualityComponent {
  @Input("label") label: string = "Quality of your solution is ";
  @Input("beforeProcessingMessage") beforeProcessingMessage: string = "Quality of your solution will be calculated\nright after you type something";
  @Input("solutionQuality") solutionQuality: SolutionQuality;
  private awards: Award[] = [];

  constructor(public dialog: MdDialog) {
    let award = new Award();
    award.name = "Problem coverage";
    award.icon = "problem_coverage_award";
    this.awards.push(award);
    award = new Award();
    award.name = "Innovativeness";
    award.icon = "problem_coverage_award";
    this.awards.push(award);
    award = new Award();
    award.name = "Snack peak quality";
    award.icon = "problem_coverage_award";
    this.awards.push(award);
  }

  public getQualityStatusName(qualityStatus: SolutionQualityStatus): string {
    if (qualityStatus == null)
      return null;
    return SolutionQualityStatus[qualityStatus];
  }

  openDetails(): void {
    let dialogRef = this.dialog.open(SolutionQualityDialog, {data: {solutionQuality: this.solutionQuality}});
  }

  isGood(): boolean {
    if (!this.solutionQuality)
      return false;
    return this.solutionQuality.status == SolutionQualityStatus.GOOD;
  }

  isFair(): boolean {
    if (!this.solutionQuality)
      return false;
    return this.solutionQuality.status == SolutionQualityStatus.FAIR;
  }

  isPure(): boolean {
    if (!this.solutionQuality)
      return false;
    return this.solutionQuality.status == SolutionQualityStatus.POOR;
  }
}
