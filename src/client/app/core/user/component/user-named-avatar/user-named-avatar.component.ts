/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../model/authentication/user";
import {Alignment} from "../../../../shared/widget/components/avatars/named-avatar/enum-alignment";
import {AvatarType} from "../../../../shared/widget/components/avatars/named-avatar/enum-avatar-type";
import {AbstractValueAccessor, MakeProvider} from "../../../../shared/abstract-value-accessor";
@Component({
  moduleId: module.id,
  selector: "ideal-user-named-avatar",
  templateUrl: "user-named-avatar.component.html",
  providers: [MakeProvider(UserNamedAvatarComponent)]
})
export class UserNamedAvatarComponent extends AbstractValueAccessor<User> implements OnInit {
  @Input("profilePictureRadius") profilePictureRadius: number = 50;
  @Input("alignment") alignment: Alignment = Alignment.center;
  @Input("type") type: AvatarType = AvatarType.DISPLAY;

  constructor() {
    super(new User());
  }

  ngOnInit(): void {
    if (this.value == null)
      this.value = new User();
  }
}
