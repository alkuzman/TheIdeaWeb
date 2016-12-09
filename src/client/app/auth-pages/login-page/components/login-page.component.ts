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
    this.router.navigate(["/problems"]);
  }

  onWrongPassword() {
    console.log("Wrong password");
    let config: MdSnackBarConfig = new MdSnackBarConfig();
    this.snackBar.open('You have entered wrong password!', "Try Again");
  }

  authenticate(): void {
    console.log("TUKA");
    let queryParams = {};
    if (this.email != null)
      queryParams = {"email": this.email};
    this.router.navigate(["auth"], {queryParams: queryParams});
  }
}
