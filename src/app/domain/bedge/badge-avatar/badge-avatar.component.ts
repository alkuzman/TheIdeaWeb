/**
 * Created by AKuzmanoski on 12/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Badge} from "../../model/awards/badges/badge";
import {BadgeIconResolverService} from "../badge-icon-resolver.service";
@Component({
  moduleId: module.id,
  selector: "ideal-badge-avatar",
  templateUrl: "badge-avatar.component.html",
  styleUrls: ["badge-avatar.component.scss"]
})
export class BadgeAvatarComponent {
  @Input("badge") badge: Badge<any, any>;
  @Input("iconSize") iconSize: string = "64px";
  @Input("maxWidth") maxWidth: string = "150px";
  @Input("tooltip") tooltip: boolean = false;

  constructor(private iconResolver: BadgeIconResolverService) {

  }

  getIcon(): string {
    return this.iconResolver.resolveIcon(this.badge);
  }
}
