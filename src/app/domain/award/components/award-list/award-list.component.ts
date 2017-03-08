/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Award} from "../../../model/awards/award";
import {Badge} from "../../../model/awards/badges/badge";
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
  private noAwardsIcon: string = "award";
  private noAwardsName: string = "No awards found";

  constructor() {
  }

  onAwardSelected(award: Award<Badge<any, any>>): void {
    this.awardSelected.emit(award);
  }
}
