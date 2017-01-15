/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Announcement} from "../../model/sharing/announcement";
import {AuthHttp} from "angular2-jwt";
import {Response, Headers, Http} from "@angular/http";
import {LoadingService} from "../../../core/loading/loading.service";
import {AnnouncementFilterProperties} from "./announcement-filter-properties";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
@Injectable()
export class AnnouncementService {
  private announcementsUrl: string = "/api/announcements";

  constructor(private authHttp: AuthHttp, private http: Http, private loadingService: LoadingService) {
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    this.loadingService.load();
    let url: string = this.announcementsUrl + "/" + id;
    return this.http.get(url, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  save(announcement: Announcement): Observable<Announcement> {
    this.loadingService.load();
    console.log(this.announcementsUrl);
    let body = JSON.stringify(announcement);
    return this.authHttp.post(this.announcementsUrl, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  getAnnouncementList(filter?: AnnouncementFilterProperties): Observable<Announcement[]> {
    this.loadingService.load();
    if (filter == null)
      filter = {};
    let params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.announcementsUrl, {headers: this.getHeaders(), search: params})
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
