/**
 * Created by AKuzmanoski on 31/10/2016.
 */
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {UserService} from "../../../user.service";
import {UserObjectService} from "../../../user-object.service";
import {User} from "../../../../model/authentication/user";
import {Response} from "@angular/http";
@Component({
  moduleId: module.id,
  selector: "ideal-new-registration-form",
  templateUrl: "new-registration-form.component.html"
})
export class NewRegistrationFormComponent implements OnInit {

  private user: User;
  @Output("usernameNotChecked") usernameNotChecked: EventEmitter<void> = new EventEmitter<void>();
  @Output("registrationSuccessful") userReady: EventEmitter<User> = new EventEmitter<User>();
  @Output("registrationUnsuccessful") registrationUnsuccessful: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService, private userObjectService: UserObjectService) {
    //userObjectService.notify();
  }

  ngOnInit(): void {
    if (this.userObjectService.user != null) {
      this.user = this.userObjectService.user;
    }
    else {
      this.usernameNotChecked.emit();
    }
  }

  save(user: User): void {
    this.user = user;
    this.userService.addUser(this.user).then(
      (user: User) => this.onUserReady(user),
      (error: Response) => this.onError(error)
    );
  }

  onUserReady(user: User): void {
    this.user = user;
    this.notify();
  }

  onError(error: Response): void {
    this.registrationUnsuccessful.emit();
  }

  notify(): void {
    this.userObjectService.user = this.user;
    this.userReady.emit(this.user);
  }
}
