import {Component, ViewContainerRef, animate, style, transition, state, trigger, HostBinding} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Response} from "@angular/http";
import {MdSnackBar, MdSnackBarConfig, AriaLivePoliteness} from "@angular/material";
import {routerAnimations} from "../../../core/helper/standard-route-animations";

/**
 * Created by Viki on 11/1/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-login-page",
  templateUrl: "login-page.component.html",
  animations: [
    routerAnimations('routeAnimation')
  ]
})
export class LoginPageComponent {
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


  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar) {
  }

  onUserLoggedIn(): void {
    this.snackBar.open("You are logged in", undefined, {duration: 3000});
    this.router.navigate(["/home"]);
  }

  onWrongPassword() {
    this.snackBar.open('You have entered wrong password!', "Try again", {duration: 3000});
  }

  authenticate(): void {
    let queryParams = {};
    if (this.email != null)
      queryParams = {"email": this.email};
    this.router.navigate(["auth"], {queryParams: queryParams});
  }
}
