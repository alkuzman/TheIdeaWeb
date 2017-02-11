/**
 * Created by Viki on 1/25/2017.
 */
import {Component, Input} from "@angular/core";
import {User} from "../../../model/authentication/user";
@Component({
  moduleId: module.id,
  selector: "ideal-user-list-item",
  templateUrl: "user-list-item.component.html",
  styleUrls: ["user-list-item.component.scss"]
})
export class UserListItemComponent {
  @Input("user") user: User;
}
