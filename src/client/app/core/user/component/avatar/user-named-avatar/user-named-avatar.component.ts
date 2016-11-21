/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
import {User} from "../../../../model/authentication/user";
import {AvatarType} from "../../../../../shared/widget/components/avatars/named-avatar/enum-avatar-type";
import {Alignment} from "../../../../../shared/widget/components/avatars/named-avatar/enum-alignment";
import {UserService} from "../../../user.service";
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
  @Input("nameFontSize") nameFontSize: string = "12pt";
  @Input("descriptionFontSize") descriptionFontSize: string = "12pt";

  constructor(private userService: UserService) {
    super(new User());
  }

  ngOnInit(): void {

  }
}
