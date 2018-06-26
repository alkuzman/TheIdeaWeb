import {catchError} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Announcement} from '../../../domain/model/sharing/announcement';
import {Observable} from 'rxjs';
import {AnnouncementService} from '../../../domain/services/announcement/announcement.service';
import {ErrorHandlingService} from '../../../core/error-handling/error-handling.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AnnouncementFeedListResolverService implements Resolve<Announcement[]> {
  constructor(private announcementServcie: AnnouncementService, private errorHandlingService: ErrorHandlingService) {

  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcement[]>
    | Promise<Announcement[]>
    | Announcement[] {
    const type: string = route.data['type'];
    const pageSize: number = route.data['pageSize'];
    const query: string = route.queryParams['query'];
    return this.announcementServcie.getAnnouncementList({
      type: type,
      query: query,
      offset: '0',
      limit: pageSize.toString()
    }).pipe(catchError((error: HttpErrorResponse) => this.errorHandlingService.handleError(error)));
  }
}
