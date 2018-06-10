import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JwtHttpService} from '../authentication/jwt/jwt-http.service';

/**
 * An injected class which grabs the application
 * config variables (e.g. STOMP credentials)
 * for the user application.
 *
 * This makes an AJAX request to the server
 * api containing some user token and secret
 *
 * @type ConfigService
 */
@Injectable()
export class ConfigService {

  // TODO: Provide a user object to the constructor
  //       to allow retrieval of per-user configs
  //       or from a specific URL.
  /** Constructor */
  constructor(private _http: JwtHttpService) {
  }


  /** Make an http request for a config file, and
   * return a Promise for its resolution.
   */
  public getConfig(path): Observable<any> {
    return this._http.get(path).pipe(
      map(res => res.json()));
  }
}
