import {Component, Input, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-form",
  templateUrl: "register-form.component.html",
  styleUrls: ["register-form.component.css"]
})
export class RegisterFormComponent {
  @Input("user") user: User;
  @Input("submitButtonText") submitButtonText: string = "Register";
  @Output("userReady") userReady: EventEmitter<User> = new EventEmitter<User>();
  active = true;

  save(): void {
    this.userReady.emit(this.user);
  }

  clearForm(): void {
    this.user = new User();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
