import {Component, OnInit} from "@angular/core";
import {Alignment} from "../../../shared/widget/components/named-avatar/enum-alignment";
import {User} from "../../../core/model/authentication/user";
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

  ngOnInit(): void {
    if (this.user == null) {
      this.user = new User();
      this.user.firstName = "Aleksandar";
      this.user.lastName = "Kuzmanoski";
      this.user.email = "aleksandarkuzmanoski11@gmail.com"
      this.user.profilePicture = "https://scontent.fskg1-1.fna.fbcdn.net/v/t1.0-9/11225436_10203432866617044_729904542407639638_n.jpg?oh=31e71e35f140c4cb0d98d1fc57a92c32&oe=5898DF30";
    }
  }
}
