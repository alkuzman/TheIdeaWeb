/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Announcement} from "../model/sharing/announcement";
import {AuthHttp} from "angular2-jwt";
import {Response, Headers, Http} from "@angular/http";
@Injectable()
export class AnnouncementService {
  private announcementsUrl: string = "/api/announcements";

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    let url: string = this.announcementsUrl + "/" + id;
    return this.http.get(url, {headers: this.getHeaders()}).map(this.extractData).catch(this.handleError);
  }

  save(announcement: Announcement): Observable<Announcement> {
    console.log(this.announcementsUrl);
    let body = JSON.stringify(announcement);
    return this.authHttp.post(this.announcementsUrl, body, {headers: this.getHeaders()})
      .map(this.extractData)
      .catch(this.handleError);
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
