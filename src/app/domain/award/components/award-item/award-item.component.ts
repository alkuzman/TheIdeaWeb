/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Award} from "../../../model/awards/award";
import {Badge} from "../../../model/awards/badges/badge";
@Component({
  moduleId: module.id,
  selector: "ideal-award-item",
  templateUrl: "award-item.component.html"
})
export class AwardItemComponent {
  @Input("award") award: Award<Badge<any, any>>;
  @Input("iconSize") iconSize: number = 44;
  @Input("maxWidth") maxWidth: number = 88;
  @Input("namesAsTooltips") namesAsTooltips: boolean = false;
  @Output("awardSelected") awardSelected: EventEmitter<Award<Badge<any, any>>> = new EventEmitter<Award<Badge<any, any>>>();
  @Output("selected") selected: EventEmitter<void> = new EventEmitter<void>();

  clicked(): void {
    this.selected.emit();
  }
}
