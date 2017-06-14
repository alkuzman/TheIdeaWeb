import {Injectable} from "@angular/core";
import {User} from "../../model/authentication/user";
/**
 * Created by AKuzmanoski on 25/11/2016.
 */
@Injectable()
export class UserObjectService {
  private _user: User;

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
  }

  removeUser(): void {
    this.user = null;
  }
}
