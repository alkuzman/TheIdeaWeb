/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {SolutionQuality} from "../../../../model/analyzers/analysis/solution-quality";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-quality-dialog",
  templateUrl: "solution-quality-dialog.component.html"
})
export class SolutionQualityDialog {
  private solutionQuality: SolutionQuality;

  constructor(public dialogRef: MdDialogRef<SolutionQualityDialog>) {
    this.solutionQuality = <SolutionQuality>dialogRef.config.data.solutionQuality;
  }
}
