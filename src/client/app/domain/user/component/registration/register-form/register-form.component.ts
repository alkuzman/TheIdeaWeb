import {Component, Input, Output, EventEmitter, ViewChild, AfterViewChecked, OnInit} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {NgForm, NgControl, FormGroup, FormBuilder} from "@angular/forms";
import {RegisterFormErrors} from "../register-fields/register-form-errors";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {ValidationMessages} from "../register-fields/register-validation-messages";
import {AvatarType} from "../../../../../shared/widget/components/avatars/named-avatar/enum-avatar-type";
import {MdSnackBar} from "@angular/material";
import {PasswordStrengthService} from "../../../../../core/helper/services/password-strength.service";
import {PasswordStrength} from "../../../../../core/helper/services/password-strength";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-form",
  templateUrl: "register-form.component.html",
  styleUrls: ["register-form.component.css"]
})
export class RegisterFormComponent implements OnInit {
  @Input("user") user: User;
  @Input("submitButtonText") submitButtonText: string = "Register";
  @Output("userReady") userReady: EventEmitter<User> = new EventEmitter<User>();
  private form: FormGroup;
  private fields: FormGroup;
  active = true;
  submitted: boolean = false;
  userAvatarType: AvatarType = AvatarType.CHOOSER;
  passwordStrengthVisible: boolean = false;
  passwordStrength: string;
  passwordStrengthProgress: number;
  passwordStrengthColor: string;

  constructor(private snackBar: MdSnackBar, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  save(): void {
    this.submitted = true;
    if (this.form.valid)
      this.userReady.emit(this.user);
    else  {
      this.snackBar.open("You cannot register with invalid field values", undefined, {duration: 3000});
    }
  }

  clearForm(): void {
    this.user = new User();
    this.submitted = false;
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
