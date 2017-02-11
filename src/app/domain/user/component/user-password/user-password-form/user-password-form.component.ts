import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {Credentials} from "../../../helper/Credentials";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdSnackBar} from "@angular/material";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-password-form",
  templateUrl: "user-password-form.component.html"
})
export class UserPasswordFormComponent implements OnInit {
  @Input("buttonText") buttonText: string = "Login";
  @Input("user") user: User;
  @Output("passwordEntered") passwordEntered: EventEmitter<Credentials> = new EventEmitter<Credentials>();
  private rememberMe: boolean = false;
  private form: FormGroup;
  private fields: FormGroup;
  private submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    this.fields = this.formBuilder.group({});
    this.form = this.formBuilder.group({
      fields: this.fields
    });

    let control = this.formBuilder.control(this.rememberMe);
    control.valueChanges.subscribe((value: boolean) => {
      this.rememberMe = value;
    });
    this.form.addControl("rememberMe", control);
  }

  login(): void {
    this.submitted = true;
    if (this.form.valid) {
      let credentials = new Credentials(this.user, this.rememberMe);
      this.passwordEntered.emit(credentials);
    }
    else {
      this.snackBar.open("You cannot authenticate with invalid field values", undefined, {duration: 3000});
    }
  }
}
