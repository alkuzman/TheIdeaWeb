import {Component, HostBinding, style, state, animate, transition, trigger} from "@angular/core";
import {User} from "../../../core/model/authentication/user";
import {Router, ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
/**
 * Created by Viki on 10/29/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-auth-page",
  templateUrl: "auth-page.component.html"
})
export class AuthPageComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  continueLogin(user: User) {
    this.router.navigate(["./login"], { relativeTo: this.route });
  }

  continueRegister(response: Response) {
    if (response.status == 404) {
      this.router.navigate(["./register"], { relativeTo: this.route })
    }
  }
}
