import {Injectable} from "@angular/core";
/**
 * Created by Viki on 11/18/2016.
 */


@Injectable()
export class JwtSecurityContext {

  constructor() {

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
  }

  hasAccessToken(): boolean {
    return !!localStorage.getItem("auth_token");
  }
}
