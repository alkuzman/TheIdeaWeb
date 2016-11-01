import {Component, Input} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../user.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-get-user-email-form",
  templateUrl: "get-user-email-form.component.html"
})
export class GetUserEmailFormComponent {
  @Input("user") user: User = new User();

  constructor(private userService: UserService, private router: Router) {

  }

  findUserByEmail(user: User) {
    this.user = user;
    this.userService.getUserByEmail(this.user.email).subscribe((user: User) => this.onUserReady(user),
      (error: any) => this.onError(error));
  }

  onUserReady(user: User) {
    this.router.navigate(["/auth/login"]);
  }

  private onError(error: Response) {
    if (error.status == 404) {
      this.router.navigate(["/auth/register"]);
    }
  }
}
