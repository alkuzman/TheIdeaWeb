import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserObjectService} from "../../../user-object.service";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-password-fields",
  templateUrl: "user-password-fields.component.html",
  providers: [MakeProvider(UserPasswordFieldsComponent)]
})
export class UserPasswordFieldsComponent extends AbstractValueAccessor<User> implements OnInit {
  constructor(private userObjectService: UserObjectService) {
    super();
  }

  ngOnInit(): void {
    if (this.value == null) {
      this.value = new User();
    }
  }

  notify() {
    super.notify();
    this.userObjectService.user = this.value;
  }
}
