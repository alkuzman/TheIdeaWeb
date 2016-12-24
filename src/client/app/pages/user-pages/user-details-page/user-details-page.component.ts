import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-details-page",
  templateUrl: "user-details-page.component.html"
})
export class UserDetailsPageComponent implements OnInit {
  private userId: number;
  private user: User;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params["id"];
    });
  }

  onUserReady(user: User) {
    this.user = user;
  }
}
