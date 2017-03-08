/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component, Inject} from "@angular/core";
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {SolutionQuality} from "../../../../model/analyzers/analysis/solution-quality";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-quality-dialog",
  templateUrl: "solution-quality-dialog.component.html"
})
export class SolutionQualityDialog {
  private solutionQuality: SolutionQuality;

  constructor(public dialogRef: MdDialogRef<SolutionQualityDialog>, @Inject(MD_DIALOG_DATA) data: any) {
    console.log(data);
    this.solutionQuality = <SolutionQuality>data.solutionQuality;
  }
}
