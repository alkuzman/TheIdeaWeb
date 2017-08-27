import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {RedirectService} from "../../../core/navigation/redirect.service";

/**
 * Created by Viki on 2/11/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-activate-page-component",
  templateUrl: "activate-page.component.html",
  styleUrls: ["activate-page.component.scss"]
})
export class ActivatePageComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
              private redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }

  continueLogin() {
    const queryParams = {email: this.user.email};
    this.redirectService.login(queryParams);
  }
}
