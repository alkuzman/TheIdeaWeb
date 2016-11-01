import {Component, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../user.service";
import {UserObjectService} from "../../../user-object.service";
import {Response} from "@angular/http";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-check-user-password-form",
  templateUrl: "check-user-password-form.component.html"
})
export class CheckUserPasswordFormComponent implements OnInit {

  constructor(private userService: UserService, private userObjectService: UserObjectService) {
  }

  user: User;

  ngOnInit(): void {
    this.user = this.userObjectService.user;
    if (this.user == null) {
      this.user = new User();
    }
  }

  checkUserPassword(user: User) {
    this.user = user;
    this.userService.loginUser(this.user).subscribe((user: User) => this.onPasswordCorrect(user),
      (error: Response) => this.onPasswordWrong(error));
  }

  private onPasswordWrong(error: Response) {

  }

  private onPasswordCorrect(user: User) {
    console.log(user);
  }
}
