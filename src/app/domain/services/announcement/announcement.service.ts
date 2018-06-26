import {Observable} from 'rxjs';
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from '@angular/core';
import {Announcement} from '../../model/sharing/announcement';
import {AnnouncementFilterProperties} from './announcement-filter-properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AnnouncementService {
  private announcementsUrl = '/api/announcements';

  constructor(private http: HttpClient) {
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    const url: string = this.announcementsUrl + '/' + id;
    return this.http.get<Announcement>(url);
  }

  save(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.announcementsUrl, announcement);
  }

  getAnnouncementList(filter?: AnnouncementFilterProperties): Observable<Announcement[]> {
    if (filter == null) {
      filter = {};
    }
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get<Announcement[]>(this.announcementsUrl, {params: params});
  }
}
