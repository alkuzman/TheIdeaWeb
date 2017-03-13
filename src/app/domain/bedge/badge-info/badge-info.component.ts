/**
 * Created by AKuzmanoski on 11/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Badge} from "../../model/awards/badges/badge";
import {BadgeIconResolverService} from "../badge-icon-resolver.service";
@Component({
  moduleId: module.id,
  selector: "ideal-badge-info",
  templateUrl: "badge-info.component.html",
  styleUrls: ["badge-info.component.scss"]
}) export class BadgeInfoComponent {
  @Input("badge") badge: Badge<any, any>;

  constructor(private badgeIconResolver: BadgeIconResolverService) {

  }

  getIcon() {
    return this.badgeIconResolver.resolveIcon(this.badge);
  }
}
