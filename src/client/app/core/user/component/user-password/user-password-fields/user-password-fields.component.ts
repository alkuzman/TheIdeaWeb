import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserObjectService} from "../../../user-object.service";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-password-fields",
  templateUrl: "user-password-fields.component.html"
})
export class UserPasswordFieldsComponent implements OnInit {
  constructor(private userObjectService: UserObjectService) {
  }

  user: User;
  @Output("userChange") userChange: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit(): void {
    if (this.user == null) {
      this.user = new User();
      this.onChange();
    }
  }

  onChange() {
    this.userObjectService.user = this.user;
    this.userChange.emit(this.user);
  }
}
