import {Component, OnInit, trigger, state, style, transition, animate, HostBinding} from "@angular/core";
import {User} from "../../../domain/model/authentication/user";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {routerAnimations} from "../../../core/helper/standard-route-animations";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
/**
 * Created by Viki on 10/29/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-auth-page",
  templateUrl: "auth-page.component.html",
  styleUrls: ["auth-page.component.css"],
  animations: [routerAnimations("routeAnimation")]
})
export class AuthPageComponent implements OnInit {
  @HostBinding("@routeAnimation") get routeAnimation() {
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

  continueLogin(user: User) {
    if (this.email == null)
      this.email = user.email;
    let queryParams = {"email": this.email};
    this.router.navigate(["login"], {relativeTo: this.route, queryParams: queryParams});
  }

  continueRegister(user: User) {
    let config: MdSnackBarConfig;
    this.snackBar.open("You are not registered, or you have misspelt your username", "Try again", {duration: 3000});
    if (this.email == null)
      this.email = user.email;
    let queryParams = {"email": this.email};
    this.router.navigate(["register"], {relativeTo: this.route, queryParams: queryParams});
  }
}
