import {Component, OnInit} from "@angular/core";
import {Alignment} from "../../../shared/widget/components/named-avatar/enum-alignment";
import {User} from "../../../core/model/authentication/user";
import {UserObjectService} from "../../../core/user/user-object.service";
/**
 * Created by Viki on 10/28/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-auth-card",
  templateUrl: "auth-card.component.html"
})
export class AuthCardComponent implements OnInit {
  namedAvatarAlignment: Alignment = Alignment.center;
  user: User;

  constructor(private userObjectService: UserObjectService)
  {

  }

  ngOnInit(): void {
    this.userObjectService.userChanged.subscribe((user: User) => this.user = user);
  }
}
