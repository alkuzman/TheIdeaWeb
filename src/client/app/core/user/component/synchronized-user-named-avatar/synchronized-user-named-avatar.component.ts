import {Component, OnInit, Input, AfterViewInit} from "@angular/core";
import {User} from "../../../model/authentication/user";
import {UserObjectService} from "../../user-object.service";
import {Alignment} from "../../../../shared/widget/components/avatars/named-avatar/enum-alignment";
/**
 * Created by AKuzmanoski on 01/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-synchronized-user-named-avatar",
  templateUrl: "synchronized-user-named-avatar.component.html"
})
export class SynchronizedUserNamedAvatar implements OnInit {
  private user: User;
  @Input("profilePictureRadius") profilePictureRadius: number = 50;
  @Input("alignment") alignment: Alignment = Alignment.center;

  constructor(private userObjectService: UserObjectService) {

  }

  ngOnInit(): void {

    this.user = this.userObjectService.user;
    this.userObjectService.userChanged.subscribe((user: User) => this.user = user, (error: any) => console.log(error));
  }
}
