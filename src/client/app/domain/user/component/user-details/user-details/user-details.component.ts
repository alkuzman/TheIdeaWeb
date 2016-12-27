import {Component, Input} from "@angular/core";
import {User} from "../../../../model/authentication/user";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-details",
  templateUrl: "user-details.component.html",
  styleUrls: ["user-details.component.css"]
})
export class UserDetailsComponent {
  @Input("user") user : User;
}
