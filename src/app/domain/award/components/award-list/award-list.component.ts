/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Award} from "../../../model/ideas/award";
@Component({
  moduleId: module.id,
  selector: "ideal-award-list",
  templateUrl: "award-list.component.html"
})
export class AwardListComponent {
  @Input("awards") awards: Award[];
  @Input("iconSize") iconSize: number = 44;
  @Input("maxSize") maxWidth: number = 88;
  @Input("disabled") disabled: boolean = false;
  @Input("namesAsTooltips") namesAsTooltips: boolean = false;
  private noAwards: Award;
  @Output("awardSelected") awardSelected: EventEmitter<Award> = new EventEmitter<Award>();

  constructor() {
    this.noAwards = new Award();
    this.noAwards.icon = "problem_coverage_award";
    this.noAwards.name = "You have no awards";
  }

  onAwardSelected(award: Award): void {
    this.awardSelected.emit(award);
  }
}
