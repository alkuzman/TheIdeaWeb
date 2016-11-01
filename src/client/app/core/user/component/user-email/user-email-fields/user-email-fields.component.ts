import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {UserObjectService} from "../../../user-object.service";
import {User} from "../../../../model/authentication/user";
/**
 * Created by Viki on 10/31/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-email-fields",
  templateUrl: "user-email-fields.component.html"
})
export class UserEmailFieldsComponent implements OnInit {

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
    console.log(this.user.email);
  }
}
