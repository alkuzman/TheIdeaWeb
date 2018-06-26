import {Observable} from 'rxjs';
/**
 * Created by Viki on 1/26/2017.
 */
import {Injectable} from '@angular/core';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {StandardFilterProperties} from '../standard-filter.properties';
import {NoticeFilterProperties} from './notice-filter-properties';
import {Notice} from '../../model/sharing/notice';
import {NoticeList} from '../../model/sharing/notice-list';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NoticeService {
  private noticesUrl = '/api/notices';

  constructor(private http: HttpClient) {
  }

  public searchNotices(filter: StandardFilterProperties): Observable<Notice[]> {
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get<Notice[]>(this.noticesUrl, {params: params});
  }

  public addNotices(noticeList: NoticeList): Observable<Notice[]> {
    const url = this.noticesUrl + '/bulk';
    return this.http.post<Notice[]>(url, noticeList);
  }

  public addNotice(notice: Notice): Observable<Notice> {
    return this.http.post<Notice>(this.noticesUrl, notice);
  }

  public getNotice(id: number): Observable<Notice> {
    const url: string = this.noticesUrl + '/' + id;
    return this.http.get<Notice>(url);
  }

  public getNoticeCount(): Observable<number> {
    const url = this.noticesUrl + '/count';
    return this.http.get<number>(url);
  }

  public markAsSeen(): Observable<void> {
    const url = this.noticesUrl + '/seen';
    return this.http.put<void>(url, undefined);
  }

  public markAsOpen(id: number): Observable<Notice> {
    const url = this.noticesUrl + '/' + id + '/opened';
    return this.http.put<Notice>(url, undefined);
  }

  getAnnouncementList(filter?: NoticeFilterProperties): Observable<Notice[]> {
    if (filter == null) {
      filter = {};
    }
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get<Notice[]>(this.noticesUrl, {params: params});
  }
}
