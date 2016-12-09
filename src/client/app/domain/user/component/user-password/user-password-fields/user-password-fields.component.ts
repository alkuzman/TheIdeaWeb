import {Component, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
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
  constructor() {
    super(new User());
  }

  ngOnInit(): void {

  }
}
