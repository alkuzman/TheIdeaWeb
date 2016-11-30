import {Component, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
import {AvatarType} from "../../../../../shared/widget/components/avatars/named-avatar/enum-avatar-type";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-fields",
  templateUrl: "register-fields.component.html",
  styleUrls: ["register-fields.component.css"],
  providers: [MakeProvider(RegisterFieldsComponent)]
})
export class RegisterFieldsComponent extends AbstractValueAccessor<User> implements OnInit {
  confirmPassword: string = "";
  userAvatarType: AvatarType = AvatarType.CHOOSER;

  constructor() {
    super(new User());
  }

  ngOnInit(): void {
  }
}
