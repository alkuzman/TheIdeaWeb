import {Component, OnInit} from "@angular/core";
import {User} from "../../../domain/model/authentication/user";
import {Router, ActivatedRoute, Params} from "@angular/router";
/**
 * Created by Viki on 10/29/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-auth-page",
  templateUrl: "auth-page.component.html"
})
export class AuthPageComponent implements OnInit {
  private email: string;

  constructor(private router: Router, private route: ActivatedRoute) {
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
    this.router.navigate(["./login"], {relativeTo: this.route, queryParams: queryParams});
  }

  continueRegister(user: User) {
    if (this.email == null)
      this.email = user.email;
    let queryParams = {"email": this.email};
    this.router.navigate(["./register"], {relativeTo: this.route, queryParams: queryParams});
  }
}
