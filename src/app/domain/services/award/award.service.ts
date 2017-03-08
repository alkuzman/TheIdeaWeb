/**
 * Created by AKuzmanoski on 07/03/2017.
 */
import {Injectable} from "@angular/core";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {SolutionQuality} from "../../model/analyzers/analysis/solution-quality";
import {Observable} from "rxjs";
import {Headers, Response} from "@angular/http";
import {Award} from "../../model/awards/award";
import {Badge} from "../../model/awards/badges/badge";
@Injectable()
export class AwardService {
  private awardsUrl = "/api/awards";

  constructor(private http: JwtHttpService) {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public generateAwards(solutionQuality: SolutionQuality): Observable<Award<Badge<any, any>>[]> {
    let url: string = this.awardsUrl + "/factory";
    let body = JSON.stringify(solutionQuality);
    return this.http.post(url, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));

  }
}
