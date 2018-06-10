import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from '@angular/core';
import {Announcement} from '../../model/sharing/announcement';
import {Headers, Response} from '@angular/http';
import {AnnouncementFilterProperties} from './announcement-filter-properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';

@Injectable()
export class AnnouncementService {
  private announcementsUrl = "/api/announcements";

  constructor(private http: JwtHttpService) {
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    const url: string = this.announcementsUrl + "/" + id;
    return this.http.get(url, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  save(announcement: Announcement): Observable<Announcement> {
    const body = JSON.stringify(announcement);
    return this.http.post(this.announcementsUrl, body, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getAnnouncementList(filter?: AnnouncementFilterProperties): Observable<Announcement[]> {
    if (filter == null) {
      filter = {};
    }
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.announcementsUrl, {headers: this.getHeaders(), search: params}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }


  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return observabconsthrowError(error);
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
