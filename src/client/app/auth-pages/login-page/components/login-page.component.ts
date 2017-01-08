import {
  Component, ViewContainerRef, animate, style, transition, state, trigger, HostBinding,
  OnInit
} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Response} from "@angular/http";
import {MdSnackBar, MdSnackBarConfig, AriaLivePoliteness} from "@angular/material";
import {routerAnimations} from "../../../core/helper/standard-route-animations";
import {AuthProperties} from "../../auth.properties";

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
export class LoginPageComponent implements OnInit{
  @HostBinding("@routeAnimation") routeAnimation() {
    return true;
  }
  @HostBinding("style.display") get display() {
    return "block";
  }

  @HostBinding("style.position") get position() {
    return "absolute";
  }


  @HostBinding("style.width") get width() {
    return "100%";
  }

  private email: string;
  private returnUrl: string;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
      this.returnUrl = params['returnUrl'];
    });
  }

  onUserLoggedIn(): void {
    this.snackBar.open("You are logged in", undefined, {duration: 3000});
    this.router.navigateByUrl(this.returnUrl);
  }

  onWrongPassword() {
    this.snackBar.open('You have entered wrong password!', "Try again", {duration: 3000});
  }

  authenticate(): void {
    let queryParams: AuthProperties = {};
    if (this.email != null)
      queryParams.email = this.email;
    if (this.returnUrl != null)
      queryParams.returnUrl = this.returnUrl;
    this.router.navigate(["auth"], {queryParams: queryParams});
  }
}
