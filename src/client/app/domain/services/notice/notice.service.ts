/**
 * Created by Viki on 1/26/2017.
 */
import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {LoadingService} from "../../../core/loading/loading.service";
import {Observable} from "rxjs";
import {Notice} from "../../model/sharing/notice";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import {Http, Response, Headers} from "@angular/http";
import {StandardFilterProperties} from "../standard-filter.properties";
@Injectable()
export class NoticeService {
  private searchableUrl = "/api/notices";

  constructor(private authHttp: AuthHttp, private loadingService: LoadingService, private http: Http) {

  }

  public searchNotices(filter: StandardFilterProperties): Observable<Notice[]> {
    this.loadingService.load();
    let params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.searchableUrl, {headers: this.getHeaders(), search: params})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public addNotice(notice: Notice): Observable<Notice> {
    let body = JSON.stringify(notice);
    return this.authHttp.post(this.searchableUrl, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
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
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
