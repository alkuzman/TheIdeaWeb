import {Component, Input, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdSnackBar} from "@angular/material";
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
  @Input("user") user: User = new User();
  @Output("emailEntered") emailEntered: EventEmitter<User> = new EventEmitter<User>();
  form: FormGroup;
  fields: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar) {
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  continue(): void {
    this.submitted = true;
    if (this.form.valid)
      this.emailEntered.emit(this.user);
    else
      this.snackBar.open("You cannot authenticate with invalid field values", undefined, {duration: 3000});
  }
}
