import {Component, style, HostBinding, OnInit} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {enterRightLeaveRight, routerAnimations} from "../../../core/helper/standard-route-animations";
import {AuthProperties} from "../../auth.properties";

/**
 * Created by Viki on 11/1/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-login-page",
  templateUrl: "login-page.component.html",
  animations: [
    enterRightLeaveRight('routeAnimation')
  ]
})
export class LoginPageComponent implements OnInit {
  @HostBinding("@routeAnimation") get routeAnimation() {
    return true;
  }

  @HostBinding("style.display") get display() {
    return "block";
  }

  @HostBinding("style.position") get position() {
    return "relative";
  }

  @HostBinding("style.opacity") get opacity() {
    return 1;
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
