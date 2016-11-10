import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {UserObjectService} from "../../../user-object.service";
import {User} from "../../../../model/authentication/user";
import {AbstractValueAccessor, MakeProvider} from "../../../../../abstract-value-accessor";
/**
 * Created by Viki on 10/31/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-email-fields",
  templateUrl: "user-email-fields.component.html",
  providers: [MakeProvider(UserEmailFieldsComponent)]
})
export class UserEmailFieldsComponent extends AbstractValueAccessor<User> implements OnInit {

  constructor(private userObjectService: UserObjectService) {
    super();
  }


  ngOnInit(): void {
    if (this.value == null) {
      this.value = new User();
    }
  }

  notify(): void {
    super.notify();
    this.userObjectService.user = this.value;
  }
}
