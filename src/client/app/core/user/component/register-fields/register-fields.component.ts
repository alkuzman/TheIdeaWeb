import {Component, OnInit} from "@angular/core";
import {User} from "../../../model/authentication/user";
import {UserObjectService} from "../../user-object.service";
import {UserHolder} from "../../user-holder";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-fields",
  templateUrl: "register-fields.component.html"
})
export class RegisterFieldsComponent extends UserHolder implements OnInit {
  confirmPassword: string = "";

  constructor(private userObjectService: UserObjectService) {
    super();
  }

  ngOnInit(): void {
    if (this.user == null) {
      this.user = new User();
      this.onChange();
    }
  }

  onChange() {
    this.userObjectService.user = this.user;
    super.onChange();
  }
}
