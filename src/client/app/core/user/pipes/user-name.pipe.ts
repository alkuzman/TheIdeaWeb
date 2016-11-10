/**
 * Created by AKuzmanoski on 01/11/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../../model/authentication/user";
@Pipe({
  name: "idealUserName",
  pure: false
})
export class UserNamePipe implements PipeTransform{
  transform(user: User, args: any): any {
    if (user == null)
      return "";

    if(user.firstName && user.lastName) {
      return user.firstName + " " + user.lastName;
    }
    else if (user.firstName) {
      return user.firstName;
    }
    else if (user.lastName) {
      return user.lastName;
    }
    return "";
  }
}
