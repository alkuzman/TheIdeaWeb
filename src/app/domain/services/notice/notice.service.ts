import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by Viki on 1/26/2017.
 */
import {Injectable} from '@angular/core';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {Headers, Response} from '@angular/http';
import {StandardFilterProperties} from '../standard-filter.properties';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {NoticeFilterProperties} from './notice-filter-properties';
import {Notice} from '../../model/sharing/notice';
import {NoticeList} from '../../model/sharing/notice-list';

@Injectable()
export class NoticeService {
  private noticesUrl = '/api/notices';

  constructor(private http: JwtHttpService) {

  }

  public searchNotices(filter: StandardFilterProperties): Observable<Notice[]> {
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.noticesUrl, {headers: this.getHeaders(), search: params}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public addNotices(noticeList: NoticeList) {
    const body = JSON.stringify(noticeList);
    const url = this.noticesUrl + '/bulk';
    return this.http.post(url, body, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public addNotice(notice: Notice): Observable<Notice> {
    const body = JSON.stringify(notice);
    return this.http.post(this.noticesUrl, body, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public getNotice(id: number) {
    const url: string = this.noticesUrl + '/' + id;
    return this.http.get(url, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public getNoticeCount(): Observable<number> {
    const url = this.noticesUrl + '/count';
    return this.http.get(url, undefined, true).pipe(
      map((response: Response) => +this.extractRawData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public markAsSeen(): Observable<void> {
    const url = this.noticesUrl + '/seen';
    return this.http.put(url, undefined, undefined, true).pipe(
      map(() => {
      }),
      catchError((error: any) => this.handleError(error)));
  }

  public markAsOpen(id: number): Observable<Notice> {
    const url = this.noticesUrl + '/' + id + '/opened';
    return this.http.put(url, undefined, undefined, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getAnnouncementList(filter?: NoticeFilterProperties): Observable<Notice[]> {
    if (filter == null) {
      filter = {};
    }
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.noticesUrl, {headers: this.getHeaders(), search: params}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private extractRawData(res: Response) {
    return res.text();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    console.log(error);
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return observableThrowError(error);
  }
}
