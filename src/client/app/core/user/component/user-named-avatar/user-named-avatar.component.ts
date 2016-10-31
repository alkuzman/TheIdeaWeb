/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../model/authentication/user";
import {Alignment} from "../../../../shared/widget/components/named-avatar/enum-alignment";
@Component({
  moduleId: module.id,
  selector: "ideal-user-named-avatar",
  templateUrl: "user-named-avatar.component.html"
})
export class UserNamedAvatarComponent implements OnInit {
  @Input("profilePictureRadius") profilePictureRadius: number = 50;
  @Input("alignment") alignment: Alignment = Alignment.center;
  @Input("user") user: User;

  ngOnInit(): void {
    if (this.user == null) {
      this.user = new User();
      this.user.firstName = "Guest";
      this.user.lastName = "Guest";
      this.user.email = "guest@ideal.com";
      this.user.profilePicture = "/assets/images/default-user.png";
    }
  }
}
