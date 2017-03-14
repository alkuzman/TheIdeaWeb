/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, Inject, OnInit, HostBinding} from "@angular/core";
import {Award} from "../../../../model/awards/award";
import {Badge} from "../../../../model/awards/badges/badge";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ThemingService} from "../../../../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-award-details-dialog",
  templateUrl: "award-details-dialog.component.html"
})
export class AwardDetailsDialogComponent implements OnInit{
  private award: Award<Badge<any, any>>;
  @HostBinding("class") private themeClass: string = "default-theme";

  constructor(public dialogRef: MdDialogRef<AwardDetailsDialogComponent>, private themingService: ThemingService, @Inject(MD_DIALOG_DATA) data: {award: Award<Badge<any, any>>}) {
    this.award = data.award;
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
