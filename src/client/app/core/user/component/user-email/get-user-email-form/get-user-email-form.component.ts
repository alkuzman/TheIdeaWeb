import {Component, EventEmitter, Output, Input, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../user.service";
import {Response} from "@angular/http";
import {JwtSecurityContext} from "../../../../../shared/security/jwt/jwt-security-context.service";
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
  @Input("email") email: string;
  user: User = new User();
  @Output("userReady") userReady: EventEmitter<User> = new EventEmitter<User>();
  @Output("userNotFound") userNotFound: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService, private userObjectService: UserObjectService) {

  }

  ngOnInit(): void {
    this.user = new User();
    if (this.email != null) {
      this.user.email = this.email;
      this.findUserByEmail(this.user);
    }
    this.notify();
  }

  findUserByEmail(user: User) {
    this.user = user;
    this.userService.getUserByEmail(this.user.email).subscribe((user: User) => this.onUserReady(user),
      (error: any) => this.onError(error));
  }

  onUserReady(user: User) {
    this.user = user;
    this.notify();
    this.userReady.emit(user);
  }

  private onError(error: Response) {
    this.notify();
    this.userNotFound.emit(this.user);
  }

  notify(): void {
    this.userObjectService.user = this.user;
  }
}
