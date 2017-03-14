import {Component, Input} from "@angular/core";
import {Award} from "../../../model/awards/award";
import {Badge} from "../../../model/awards/badges/badge";
/**
 * Created by AKuzmanoski on 10/03/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-award-details",
  templateUrl: "award-details.component.html"
})
export class AwardDetailsComponent {
  @Input("award") award: Award<Badge<any, any>>;
}
