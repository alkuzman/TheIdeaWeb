/**
 * Created by AKuzmanoski on 08/03/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Badge} from "../../model/awards/badges/badge";
import {BadgeIconResolverService} from "../badge-icon-resolver.service";
@Component({
  moduleId: module.id,
  selector: "ideal-badge-button",
  templateUrl: "badge-button.component.html"
})
export class BadgeButtonComponent {
  @Input("badge") badge: Badge<any, any>;
  private _iconSize: number;
  private _buttonSize: number;
  @Input("iconSize") set iconSize(iconSize: number) {
    this._iconSize = iconSize;
    this._buttonSize = iconSize + 18;
  }
  @Input("namesAsTooltips") namesAsTooltips: boolean;
  @Input("maxWidth") maxWidth: number;
  @Output("selected") selected: EventEmitter<void> = new EventEmitter<void>();

  constructor(private badgeIconResolver: BadgeIconResolverService) {

  }

  getIconName(badge: Badge<any, any>): string {
    return this.badgeIconResolver.resolveIcon(badge);
  }

  clicked(): void {
    this.selected.emit();
  }
}
