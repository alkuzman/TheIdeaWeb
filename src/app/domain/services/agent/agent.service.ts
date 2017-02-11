/**
 * Created by Viki on 1/25/2017.
 */
import {Injectable} from "@angular/core";
import {Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Agent} from "../../model/authentication/agent";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import {AgentFilterProperties} from "./agent-filter.properties";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
@Injectable()
export class AgentService {
  private agentsUrl: string = "/api/agents";

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

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public getAgents(filterProperties: AgentFilterProperties): Observable<Agent[]> {
    let params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get(this.agentsUrl, {headers: this.getHeaders(), search: params})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}
