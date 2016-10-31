/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {Injectable, EventEmitter} from "@angular/core";
import {User} from "../model/authentication/user";
@Injectable()
export class UserObjectService {
  private _user: User;
  userChanged: EventEmitter<User> = new EventEmitter<User>();

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
    this.userChanged.emit(this.user);
  }


}
