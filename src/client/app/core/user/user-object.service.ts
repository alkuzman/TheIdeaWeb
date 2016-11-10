/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {Injectable, EventEmitter} from "@angular/core";
import {User} from "../model/authentication/user";
import {Subject} from "rxjs";
@Injectable()
export class UserObjectService {
  private _user: User;
  userChanged: EventEmitter<User> = new EventEmitter<User>();

  set user(value: User) {
    this._user = value;
    this.notify();
  }

  get user(): User {
    return this._user;
  }

  notify(): void {
    this.userChanged.emit(this.user);
  }
}
