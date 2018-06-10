import {catchError} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from '@angular/core';
import {Announcement} from '../../../domain/model/sharing/announcement';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AnnouncementService} from '../../../domain/services/announcement/announcement.service';
import {ErrorHandlingService} from '../../../core/error-handling/error-handling.service';

@Injectable()
export class AnnouncementResolverService implements Resolve<Announcement> {
  constructor(private announcementService: AnnouncementService, private errorHandlingService: ErrorHandlingService) {


  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcement>|Promise<Announcement>|Announcement {
    const id = route.params['id'];
    return this.announcementService.getAnnouncementById(id).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }


}
