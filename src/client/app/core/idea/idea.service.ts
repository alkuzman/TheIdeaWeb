/**
 * Created by AKuzmanoski on 11/10/2016.
 */
import {Injectable} from "@angular/core";
import {Logger} from "../../logger.service";
import {Idea} from "../model/ideas/idea";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class IdeaService {
  private ideasUrl = "/api/ideas";

  constructor(private logger: Logger, private http: Http) {

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
    return Observable.throw(errMsg);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    let authToken = localStorage.getItem("auth_token");
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', 'Bearer ' + authToken);
    return headers;
  }

  getIdeas(): Observable<Idea[]> {
    return this.http.get(this.ideasUrl, {headers: this.getHeaders()}).map(this.extractData).catch(this.handleError);
  }

  getIdea(id: number): Observable<Idea> {
    let url = this.ideasUrl + "/" + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user's search value*/
    return this.http.get(url, {headers: this.getHeaders()})
      .map(this.extractData)
      .catch(this.handleError)
  }

  addIdea(idea: Idea): Promise<Idea> {
    let body = JSON.stringify(idea);
    return this.http.post(this.ideasUrl, body, {headers: this.getHeaders()})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
