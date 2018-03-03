import {Component, HostBinding, OnInit} from "@angular/core";
import {User} from "../../../domain/model/authentication/user";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

/**
 * Created by Viki on 10/29/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-auth-page",
  templateUrl: "auth-page.component.html",
  styleUrls: ["auth-page.component.scss"]
})
export class AuthPageComponent implements OnInit {

  email: string;
  returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
      this.returnUrl = params['returnUrl'];
    });
  }

  continueLogin(user: User) {
    if (this.email == null) {
      this.email = user.email;
    }
    if (this.returnUrl == null) {
      this.returnUrl = "/home";
    }
    const queryParams = {"email": this.email, "returnUrl": this.returnUrl};
    this.router.navigate(["login"], {relativeTo: this.route, queryParams: queryParams});
  }

  continueRegister(user: User) {
    this.snackBar.open("You are not registered, or you have misspelt your username", "Try again", <MatSnackBarConfig>{duration: 3000});
    if (this.email == null) {
      this.email = user.email;
    }
    if (this.returnUrl == null) {
      this.returnUrl = "/home";
    }
    const queryParams = {"email": this.email, "returnUrl": this.returnUrl};
    this.router.navigate(["register"], {relativeTo: this.route, queryParams: queryParams});
  }
}
