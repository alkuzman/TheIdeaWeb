/**
 * Created by AKuzmanoski on 11/10/2016.
 */
import {Injectable} from "@angular/core";
import {Idea} from "../../model/ideas/idea";
import {Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {IdeasFilterProperties} from "../../idea/params/ideas-filter.properties";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import any = jasmine.any;


@Injectable()
export class IdeaService {
  private ideasUrl = "/api/ideas";

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

  getIdeas(filterProperties: IdeasFilterProperties): Observable<Idea[]> {
    let params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get(this.ideasUrl, {headers: this.getHeaders(), search: params}, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  getIdea(id: number): Observable<Idea> {
    let url = this.ideasUrl + "/" + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user-pages's search value*/
    return this.http.get(url, {headers: this.getHeaders()}, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  addIdea(idea: Idea): Observable<Idea> {
    let body = JSON.stringify(idea);
    return this.http.post(this.ideasUrl, body, {headers: this.getHeaders()}, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}
