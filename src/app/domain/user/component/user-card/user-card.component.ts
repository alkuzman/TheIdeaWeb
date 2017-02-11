/**
 * Created by Viki on 1/21/2017.
 */
import {Component, Input, EventEmitter, Output} from "@angular/core";
import {User} from "../../../model/authentication/user";
@Component({
  moduleId: module.id,
  selector: "ideal-user-card",
  templateUrl: "user-card.component.html"
})
export class UserCardComponent {
  @Input("user") user: User;
  @Output("contentSelected") contentSelected: EventEmitter<User> = new EventEmitter<User>();

  onContentSelected(user: User) {
    this.contentSelected.emit(user);
  }
}
