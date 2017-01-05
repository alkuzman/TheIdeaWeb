import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {FieldError} from "../../core/helper/field-error";
import {routerAnimations} from "../../core/helper/standard-route-animations";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-page",
  templateUrl: "register-page.component.html",
  animations: [
    routerAnimations('routeAnimation')
  ]
})
export class RegisterPageComponent implements OnInit {
  @HostBinding("@routeAnimation") routeAnimation() {
    return true;
  }
  @HostBinding("style.display") get display() {
    return "block";
  }

  @HostBinding("style.position") get position() {
    return "fixed";
  }


  @HostBinding("style.width") get width() {
    return "50%";
  }

  private email: string;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
    });
  }

  authenticate(): void {
    let queryParams = {};
    if (this.email != null)
      queryParams = {"email": this.email};
    this.router.navigate(["auth"], {queryParams: queryParams});
  }

  login(user: User): void {
    this.snackBar.open("Your registration is successful!", undefined, {duration: 3000});
    if (this.email == null)
      this.email = user.email;
    let queryParams = {"email": this.email};
    this.router.navigate(["auth"], {queryParams: queryParams});
  }

  constraintsViolated(fieldErrors: FieldError[]): void {
    let message: string = "";
    for (let fieldError of fieldErrors) {
      message += "[" + fieldError.field + "] " + fieldError.message + "\n";
    }
    message = message.substring(0, message.length - 1);
    this.snackBar.open(message, 'Try Again', {duration: 3000});
  }
}
