import {Component, ViewContainerRef} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Response} from "@angular/http";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

/**
 * Created by Viki on 11/1/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-login-page",
  templateUrl: "login-page.component.html"
})
export class LoginPageComponent {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private viewContainerRef: ViewContainerRef) {
  }

  onUserLoggedIn(): void {
    this.router.navigate(["/problems"]);
  }

  onWrongPassword() {
    console.log("Wrong password");
    let config = new MdSnackBarConfig(this.viewContainerRef);
    this.snackBar.open('You have entered wrong password!', 'Try Again', config);
  }
}
