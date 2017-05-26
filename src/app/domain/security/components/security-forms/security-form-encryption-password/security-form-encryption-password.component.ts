import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
/**
 * Created by Viki on 2/12/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-security-form-encryption-password",
  templateUrl: "security-form-encryption-password.component.html"
})
export class SecurityFormEncryptionPasswordComponent implements OnInit {

  form: FormGroup;
  fields: FormGroup;
  @Output("passwordReady") passwordReady: EventEmitter<string> = new EventEmitter<string>();
  password: string;
  submitted: boolean = false;
  @Input("buttonText") buttonText: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  public enter(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.passwordReady.emit(this.password);
    }
  }

  public onPasswordChange(password: string) {
    this.password = password;
  }
}
