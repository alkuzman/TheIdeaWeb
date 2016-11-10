import {User} from "../model/authentication/user";
import {Output, EventEmitter, Injectable} from "@angular/core";
/**
 * Created by Viki on 10/31/2016.
 */
export class UserHolder {

  constructor() {

  }

  user: User;
  @Output("userChange") userChange: EventEmitter<User> = new EventEmitter<User>();

  onChange() {
    this.userChange.emit(this.user);
  }
}
