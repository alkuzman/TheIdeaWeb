/**
 * Created by AKuzmanoski on 24/02/2017.
 */
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SolutionQuality} from '../../../../model/analyzers/analysis/solution-quality';

@Component({
  moduleId: module.id,
  selector: 'ideal-solution-quality-dialog',
  templateUrl: 'solution-quality-dialog.component.html'
})
export class SolutionQualityDialogComponent {
  solutionQuality: SolutionQuality;

  constructor(public dialogRef: MatDialogRef<SolutionQualityDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.solutionQuality = <SolutionQuality>data.solutionQuality;
  }
}
