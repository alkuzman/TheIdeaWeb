import {Component, Input, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
/**
 * Created by Viki on 10/31/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-email-form",
  templateUrl: "user-email-form.component.html"
})
export class UserEmailFormComponent {
  @Input("buttonText") buttonText: string = "Continue";
  @Input("user") user: User;
  @Output("emailEntered") emailEntered: EventEmitter<User> = new EventEmitter<User>();

  continue(): void {
    this.emailEntered.emit(this.user);
  }
}
