/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Award} from "../../../model/ideas/award";
@Component({
  moduleId: module.id,
  selector: "ideal-award-item",
  templateUrl: "award-item.component.html"
})
export class AwardItemComponent {
  @Input("award") award: Award;
  private _iconSize: number;
  private _buttonSize: number;
  @Input("iconSize") set iconSize(iconSize: number) {
    this._iconSize = iconSize;
    this._buttonSize = iconSize + 18;
  }
  @Input("namesAsTooltips") namesAsTooltips: boolean;
  @Input("maxWidth") maxWidth: number;
  @Input("disabled") disabled: boolean;
  @Output("selected") selected: EventEmitter<void> = new EventEmitter<void>();

  clicked(): void {
    this.selected.emit();
  }
}
