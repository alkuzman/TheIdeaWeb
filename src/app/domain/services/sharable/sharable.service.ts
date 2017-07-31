/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Shareable} from "../../model/sharing/shareable";
import {Response} from "@angular/http";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
@Injectable()
export class SharableService {
  private sharableUrl: string = "/api/sharables";

  constructor(private http: JwtHttpService) {

  }

  getSharableById(id: number): Observable<Shareable> {
    let url: string = this.sharableUrl + "/" + id;
    return this.http.get(url)
      .map((response: Response) => this.handleRequest(response))
      .catch((error: any) => this.handleError(error));
  }


  handleRequest(response: Response): Shareable {
    let body: Shareable = response.json();
    return body;
  }

  handleError(error: any) {
    return Observable.throw(error);
  }
}
