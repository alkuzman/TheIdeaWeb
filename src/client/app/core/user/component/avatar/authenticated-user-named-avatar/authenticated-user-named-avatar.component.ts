import {Component, OnInit, Input, AfterViewInit} from "@angular/core";
import {JwtSecurityContext} from "../../../../../shared/security/jwt/jwt-security-context.service";
import {User} from "../../../../model/authentication/user";
import {Alignment} from "../../../../../shared/widget/components/avatars/named-avatar/enum-alignment";
/**
 * Created by AKuzmanoski on 01/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-authenticated-user-named-avatar",
  templateUrl: "authenticated-user-named-avatar.component.html"
})
export class AuthenticatedUserNamedAvatarComponent implements OnInit {
  private user: User;
  @Input("profilePictureRadius") profilePictureRadius: number = 50;
  @Input("alignment") alignment: Alignment = Alignment.left;
  @Input("nameFontSize") nameFontSize: string = "12pt";
  @Input("descriptionFontSize") descriptionFontSize: string = "12pt";

  constructor(private securityContext: JwtSecurityContext) {

  }

  ngOnInit(): void {
    this.user = this.securityContext.principal;
    if (this.user == null) {
      this.user = new User();
      this.user.firstName = "Guest";
      this.user.name = "Guest";
      this.user.email = "guest@ideal-hub.com";
    }
  }
}
