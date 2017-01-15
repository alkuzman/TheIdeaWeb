/**
 * Created by AKuzmanoski on 15/01/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {LoadingService} from "../loading/loading.service";
import {PropertiesToUrlSearchParams} from "../../shared/utils/properties-to-url-search-params";
import {Properties} from "../../shared/utils/properties";
import {LimitProperties} from "./limit.properties";
@Injectable()
export class AnalyzerService {
  private analyzersUrl: string = "/processing/analyzers";

  constructor(private http: Http, private loadingService: LoadingService) {

  }

  public calculatePopularity(text: String): Observable<number> {
    this.loadingService.load();
    let body = JSON.stringify(text);
    let url: string = this.analyzersUrl + "/popularity";
    return this.http.post(url, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public getSymilarDocuments(text: String, filter: LimitProperties): Observable<number> {
    this.loadingService.load();
    let body = JSON.stringify(text);
    let props = PropertiesToUrlSearchParams.transform(filter);
    let url: string = this.analyzersUrl + "/similarity";
    return this.http.post(url, body, {headers: this.getHeaders(), search: props})
      .map((response: Response) => this.extractDocumentData(response))
      .catch((error: any) => this.handleError(error));
  }

  private extractDocumentData(res: Response) {
    this.loadingService.loadingDone();
    let body = res.json();
    return body || {};
  }

  private extractData(res: Response) {
    this.loadingService.loadingDone();
    let body = res.json();
    return body || 0;
  }

  private handleError(error: any) {
    this.loadingService.loadingDone();
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
