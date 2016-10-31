import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {User} from "../../../model/authentication/user";
import {UserObjectService} from "../../user-object.service";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-fields",
  templateUrl: "register-fields.component.html"
})
export class RegisterFieldsComponent implements OnInit {
  user: User;
  confirmPassword: string = "";
  @Output("userChange") userChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userObjectService: UserObjectService) {

  }

  ngOnInit(): void {
    this.user = new User();
    this.userObjectService.user = this.user;
  }

  onChange() {
    this.userObjectService.user = this.user;
    this.userChange.emit(this.user);
  }
}
