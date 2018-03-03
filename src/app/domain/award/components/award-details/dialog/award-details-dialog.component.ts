/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, HostBinding, Inject, OnInit} from "@angular/core";
import {Award} from "../../../../model/awards/award";
import {Badge} from "../../../../model/awards/badges/badge";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ThemingService} from "../../../../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-award-details-dialog",
  templateUrl: "award-details-dialog.component.html"
})
export class AwardDetailsDialogComponent implements OnInit {
  award: Award<Badge<any, any>>;
  @HostBinding("class") themeClass: string;

  constructor(public dialogRef: MatDialogRef<AwardDetailsDialogComponent>, private themingService: ThemingService,
              @Inject(MAT_DIALOG_DATA) data: any) {
    const d = <{ award: Award<Badge<any, any>> }>data;
    this.award = d.award;
  }

  getTitle(): string {
    switch (this.award.type) {
      case "ProblemCoverageAward":
        return "Problem Coverage Details";
      case "SnackPeakQualityAward":
        return "Snack Peak Quality Details";
      default:
        return "Award Details";
    }
  }

  ngOnInit() {
    this.themeClass = this.themingService.currentTheme;
    this.themingService.themeObservable.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }
}
