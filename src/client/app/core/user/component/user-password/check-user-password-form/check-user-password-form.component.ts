import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../user.service";
import {UserObjectService} from "../../../user-object.service";
import {Response} from "@angular/http";
import {Credentials} from "../../../helper/Credentials";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-check-user-password-form",
  templateUrl: "check-user-password-form.component.html"
})
export class CheckUserPasswordFormComponent implements OnInit {
  @Output("passwordCorrect") passwordCorrect: EventEmitter<User> = new EventEmitter<User>();
  @Output("passwordIncorrect") passwordIncorrect: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService, private userObjectService: UserObjectService) {
  }

  user: User;

  ngOnInit(): void {
    if (this.userObjectService.user == null)
      this.userObjectService.user = new User();
    this.user = this.userObjectService.user;
  }

  checkUserPassword(credentials: Credentials) {
    this.userService.loginUser(credentials).subscribe((response: Response) => this.onPasswordCorrect(response),
      (error: Response) => this.onPasswordWrong(error));
  }

  private onPasswordWrong(error: Response) {
    this.notifyPasswordWrong();
  }

  private onPasswordCorrect(response: Response) {
    this.notifyPasswordCorrect()
  }

  notifyPasswordCorrect(): void {
    this.passwordCorrect.emit(this.user);
    this.notify();
  }

  notifyPasswordWrong(): void {
    this.passwordIncorrect.emit();
    this.notify();
  }

  notify(): void {
    this.userObjectService.user = this.user;
  }
}

