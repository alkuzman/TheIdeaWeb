import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../user.service";
import {Response} from "@angular/http";
import {UserObjectService} from "../../../user-object.service";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-get-user-email-form",
  templateUrl: "get-user-email-form.component.html"
})
export class GetUserEmailFormComponent implements OnInit {
  user: User = new User();
  @Output("userReady") userReady: EventEmitter<User> = new EventEmitter<User>();
  @Output("userNotFound") userNotFound: EventEmitter<Response> = new EventEmitter<Response>();

  constructor(private userService: UserService, private userObjectService: UserObjectService) {

  }

  ngOnInit(): void {
    this.user = new User();
    this.notify();
  }

  findUserByEmail(user: User) {
    this.user = user;
    this.userService.getUserByEmail(this.user.email).subscribe((user: User) => this.onUserReady(user),
      (error: any) => this.onError(error));
  }

  onUserReady(user: User) {
    this.user = user;
    this.userReady.emit(user);
    this.notify();
  }

  private onError(error: Response) {
    this.userNotFound.emit(error);
    this.notify();
  }

  notify(): void {
    this.userObjectService.user = this.user;
  }
}
