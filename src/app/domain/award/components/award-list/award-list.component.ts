/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Award} from "../../../model/awards/award";
import {Badge} from "../../../model/awards/badges/badge";
import {AwardDetailsDialogComponent} from "../award-details/dialog/award-details-dialog.component";
import {MdDialogConfig, MdDialog} from "@angular/material";
@Component({
  moduleId: module.id,
  selector: "ideal-award-list",
  templateUrl: "award-list.component.html"
})
export class AwardListComponent {
  @Input("awards") awards: Award<Badge<any, any>>[];
  @Input("iconSize") iconSize: number = 44;
  @Input("maxWidth") maxWidth: number = 88;
  @Input("namesAsTooltips") namesAsTooltips: boolean = false;
  @Output("awardSelected") awardSelected: EventEmitter<Award<Badge<any, any>>> = new EventEmitter<Award<Badge<any, any>>>();
  noAwardsIcon: string = "award";
  noAwardsName: string = "No awards found";

  constructor(private dialog: MdDialog) {
  }

  onAwardSelected(award: Award<Badge<any, any>>): void {
    this.awardSelected.emit(award);
    this.openDetails(award);
  }

  openDetails(award: Award<Badge<any, any>>): void {
    let dialogRef = this.dialog.open(AwardDetailsDialogComponent, <MdDialogConfig>{
      disableClose: false,
      width: '',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }, data: {award: award}
    });
  }
}
