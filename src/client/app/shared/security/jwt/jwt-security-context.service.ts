import {Injectable} from "@angular/core";
import {SecurityContext} from "../security.context.service";
/**
 * Created by Viki on 11/18/2016.
 */


@Injectable()
export class JwtSecurityContext extends SecurityContext {

  constructor() {
    super();
  }

  get accessToken(): string {
    return localStorage.getItem("auth_token");
  }

  set accessToken(accessToken: string) {
    localStorage.setItem("auth_token", accessToken);
  }

  get refreshToken(): string {
    return localStorage.getItem("auth_refresh_token");
  }

  set refreshToken(refreshToken: string) {
    localStorage.setItem("auth_refresh_token", refreshToken);
  }

  clearSecurityContext() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    super.clearSecurityContext();
  }

  hasAccessToken(): boolean {
    return !!localStorage.getItem("auth_token");
  }
}
