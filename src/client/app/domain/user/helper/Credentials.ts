import {User} from "../../model/authentication/user";
/**
 * Created by Viki on 11/17/2016.
 */
export class Credentials {
  constructor(public user: User, public rememberMe: boolean) {

  }
}
