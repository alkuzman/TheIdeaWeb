import {Component, HostBinding, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {AuthProperties} from "../../auth.properties";
import {AccessFromUrlNotAllowedGuard} from "../../../core/guards/access-from-url-not-allowed.guard";

/**
 * Created by Viki on 11/1/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-login-page",
  templateUrl: "login-page.component.html"
})
export class LoginPageComponent implements OnInit {

  email: string;
  returnUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private accessFromUrlGuard: AccessFromUrlNotAllowedGuard) {
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

  ngOnInit(): void {
    console.log("login on init");
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
      this.returnUrl = params['returnUrl'];
    });
  }

  onUserLoggedIn(): void {
    this.snackBar.open("You are logged in", undefined, <MatSnackBarConfig>{duration: 3000});
    this.router.navigateByUrl(this.returnUrl);
  }

  onWrongPassword() {
    this.snackBar.open('You have entered wrong password!', "Try again", <MatSnackBarConfig>{duration: 3000});
  }

  onUserNotActivated() {
    const snackBarRef = this.snackBar.open("You have not activated your account, please check your email.", "More",
      <MatSnackBarConfig>{duration: 3000}).onAction().subscribe(null, null, () => {
      const queryParams: AuthProperties = {};
      if (this.email != null) {
        queryParams.email = this.email;
      }
      this.accessFromUrlGuard.allow = true;
      this.router.navigate(["/auth/verify"], {queryParams: queryParams});
    });

  }

  authenticate(): void {
    const queryParams: AuthProperties = {};
    if (this.email != null) {
      queryParams.email = this.email;
    }
    if (this.returnUrl != null) {
      queryParams.returnUrl = this.returnUrl;
    }
    this.router.navigate(["auth"], {queryParams: queryParams});
  }
}
