import {Component, Input, Output, EventEmitter} from "@angular/core";
import {User} from "../../../model/authentication/user";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-form",
  templateUrl: "register-form.component.html"
})
export class RegisterFormComponent {
  @Input("user") user;
  @Input("submitButtonText") submitButtonText: string = "Register";
  @Output("userCreated") userCreated: EventEmitter<User> = new EventEmitter<User>();

  save(): void {
    this.userCreated.emit(this.user);
  }
}
