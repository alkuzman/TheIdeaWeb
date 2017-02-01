import {Component, Input, OnInit} from "@angular/core";
import {Alignment} from "../../../../../shared/widget/components/avatars/named-avatar/enum-alignment";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../../services/user/user.service";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-load-user-named-avatar",
  templateUrl: "load-user-named-avatar.component.html"
})
export class LoadUserNamedAvatarComponent implements OnInit{
  @Input("alignment") alignment: Alignment = Alignment.center;
  @Input("profilePictureRadius") profilePictureRadius: number;
  @Input("nameFontSize") nameFontSize: string = "12pt";
  @Input("descriptionFontSize") descriptionFontSize: string = "12pt";
  @Input("userId") userId: number;
  user: User;
  errorMessage: string;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(
      user => this.user = user,
      error => this.errorMessage = error
    );
  }
}
