/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Badge} from "../../model/awards/badges/badge";
import {BadgeSiblingsService} from "../badge-siblings.service";
@Component({
  moduleId: module.id,
  selector: "ideal-badge-descendants",
  templateUrl: "badge-descendants.component.html"
})
export class BadgeDescendantsComponent {
  _badge: Badge<any, any>;
  descendants: Badge<any, any>[];

  constructor(private badgeSiblings: BadgeSiblingsService) {

  }

  @Input("badge")
  public get badge(): Badge<any, any> {
    return this._badge
  }

  public set badge(value: Badge<any, any>) {
    this._badge = value;
    this.descendants = this.badgeSiblings.getDescendants(this.badge);
  }

  hasItems(descendants: Badge<any, any>[]) {
    return descendants != null && descendants.length > 0;
  }
}
