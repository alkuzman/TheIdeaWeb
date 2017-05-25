import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../../services/user/user.service";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-user-details-loader",
  template: `
    <ideal-user-details [user]="user"></ideal-user-details>`
})
export class UserDetailsLoaderComponent implements OnInit {
  @Input("userId") userId: number;
  @Output("userReady") userReady: EventEmitter<User> = new EventEmitter<User>();
  user: User;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUserById(this.userId)
      .subscribe(
        (user: User) => {
          this.user = user;
          this.userReady.emit(user);
        }
      );
  }
}
