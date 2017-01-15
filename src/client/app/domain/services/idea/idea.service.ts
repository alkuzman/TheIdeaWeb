/**
 * Created by AKuzmanoski on 11/10/2016.
 */
import {Injectable, Inject} from "@angular/core";
import {Logger} from "../../../logger.service";
import {Idea} from "../../model/ideas/idea";
import {Response, Headers, Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {IdeasFilterProperties} from "../../idea/params/ideas-filter.properties";
import {Properties} from "../../../shared/utils/properties";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import {AuthHttp} from "angular2-jwt";
import {LoadingService} from "../../../core/loading/loading.service";
import {LoadingState} from "../../../core/loading/loading-state";
import any = jasmine.any;


@Injectable()
export class IdeaService {
  private ideasUrl = "/api/ideas";

  constructor(private logger: Logger, private http: Http, private authHttp: AuthHttp, private loadingService: LoadingService) {

  }

  private extractData(res: Response) {
    this.loadingService.loadingDone();
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    this.loadingService.loadingDone();
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
    this.loadingService.load();
    let params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get(this.ideasUrl, {headers: this.getHeaders(), search: params})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  getIdea(id: number): Observable<Idea> {
    this.loadingService.load();
    let url = this.ideasUrl + "/" + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user-pages's search value*/
    return this.http.get(url, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  addIdea(idea: Idea): Promise<Idea> {
    this.loadingService.load();
    let body = JSON.stringify(idea);
    return this.authHttp.post(this.ideasUrl, body, {headers: this.getHeaders()})
      .toPromise()
      .then((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}