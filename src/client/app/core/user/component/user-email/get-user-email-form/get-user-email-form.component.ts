import {Component, EventEmitter, Output} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../user.service";
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
  user: User = new User();
  @Output("userReady") userReady: EventEmitter<User> = new EventEmitter<User>();
  @Output("userNotFound") userNotFound: EventEmitter<Response> = new EventEmitter<Response>();

  constructor(private userService: UserService) {

  }

  findUserByEmail(user: User) {
    this.user = user;
    this.userService.getUserByEmail(this.user.email).subscribe((user: User) => this.onUserReady(user),
      (error: any) => this.onError(error));
  }

  onUserReady(user: User) {
    this.userReady.emit(user);
  }

  private onError(error: Response) {
    this.userNotFound.emit(error);
  }
}
