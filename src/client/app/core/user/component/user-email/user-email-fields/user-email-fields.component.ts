import {Component, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
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

  constructor() {
    super(new User());
  }


  ngOnInit(): void {
  }
}
