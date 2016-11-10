/**
 * Created by AKuzmanoski on 01/11/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../../model/authentication/user";
@Pipe({
  name: "idealUserProfilePicture",
  pure: false
})
export class UserProfilePicturePipe implements PipeTransform {
  transform(user: User, args: any): any {
    return user.profilePicture || user.profilePicture == "" ? user.profilePicture : "/assets/images/default-user.png";
  }

}
