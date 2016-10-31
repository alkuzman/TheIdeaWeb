/**
 * Created by AKuzmanoski on 31/10/2016.
 */
import {Component} from "@angular/core";
import {User} from "../../../model/authentication/user";
import {UserService} from "../../user.service";
import {UserObjectService} from "../../user-object.service";
@Component({
  moduleId: module.id,
  selector: "ideal-new-registration-form",
  templateUrl: "new-registration-form"
})
export class NewRegistrationFormComponent {
  private user: User;

  constructor(private userService: UserService, private userObjectService: UserObjectService) {

  }


}
