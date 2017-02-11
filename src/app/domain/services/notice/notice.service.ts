/**
 * Created by Viki on 1/26/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Notice} from "../../model/sharing/notice";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import {Response, Headers} from "@angular/http";
import {StandardFilterProperties} from "../standard-filter.properties";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
@Injectable()
export class NoticeService {
  private searchableUrl = "/api/notices";

  constructor(private http: JwtHttpService) {

  }

  public searchNotices(filter: StandardFilterProperties): Observable<Notice[]> {
    let params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.searchableUrl, {headers: this.getHeaders(), search: params}, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public addNotice(notice: Notice): Observable<Notice> {
    let body = JSON.stringify(notice);
    return this.http.post(this.searchableUrl, body, {headers: this.getHeaders()}, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public getNoticeCount(): Observable<number> {
    let url = this.searchableUrl + "/count";
    return this.http.get(url, undefined, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
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
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
