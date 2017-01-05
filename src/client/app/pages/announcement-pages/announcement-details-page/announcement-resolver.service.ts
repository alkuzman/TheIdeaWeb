/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AnnouncementService} from "../../../domain/announcement/announcement.service";
import {Response} from "@angular/http";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
@Injectable()
export class AnnouncementResolverService implements Resolve<Announcement> {
  constructor(private announcementService: AnnouncementService, private errorHandlingService: ErrorHandlingService) {


  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcement>|Promise<Announcement>|Announcement {
    let id = route.params['id'];
    return this.announcementService.getAnnouncementById(id).toPromise().catch((error: any) => this.errorHandlingService.handleError(error));
  }


}
