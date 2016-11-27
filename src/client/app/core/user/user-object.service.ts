import {Injectable} from "@angular/core";
import {User} from "../model/authentication/user";
/**
 * Created by AKuzmanoski on 25/11/2016.
 */
@Injectable()
export class UserObjectService {
  private _user: User;

  public get user(): User {
    return JSON.parse(localStorage.getItem("user"));
  }

  public set user(user: User) {
      localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser(): void {
     localStorage.removeItem("user");
  }
}
