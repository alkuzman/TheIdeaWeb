import {Component, ViewContainerRef, animate, style, transition, state, trigger, HostBinding} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Response} from "@angular/http";
import {MdSnackBar, MdSnackBarConfig, AriaLivePoliteness} from "@angular/material";

/**
 * Created by Viki on 11/1/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-login-page",
  templateUrl: "login-page.component.html",
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class LoginPageComponent {
  private email: string;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }


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
