import {Component, Input, EventEmitter, Output} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {Credentials} from "../../../helper/Credentials";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-password-form",
  templateUrl: "user-password-form.component.html"
})
export class UserPasswordFormComponent {
  @Input("buttonText") buttonText: string = "Login";
  @Input("user") user: User;
  @Output("passwordEntered") passwordEntered: EventEmitter<Credentials> = new EventEmitter<Credentials>();
  rememberMe: boolean = false;

  login(): void {
    let credentials = new Credentials(this.user, this.rememberMe);
    this.passwordEntered.emit(credentials);
  }
}
