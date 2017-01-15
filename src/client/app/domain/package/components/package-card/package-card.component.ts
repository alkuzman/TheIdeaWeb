import {Component, Input} from "@angular/core";
import {Package} from "../../../model/sharing/package";
/**
 * Created by AKuzmanoski on 09/01/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-package-card",
  templateUrl: "package-card.component.html"
})
export class PackageCardComponent {
  @Input("package") pckg: Package;
}
