/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {Observable} from "rxjs";
import {AnnouncementService} from "../../../domain/services/announcement/announcement.service";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
import {Response} from "@angular/http";
@Injectable()
export class AnnouncementFeedListResolverService implements Resolve<Announcement[]> {
  constructor(private announcementServcie: AnnouncementService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcement[]>|Promise<Announcement[]>|Announcement[] {
    let type: string = route.data["type"];
    let pageSize: number = route.data["pageSize"];
    let query: string = route.queryParams["query"];
    return this.announcementServcie.getAnnouncementList({
      type: type,
      query: query,
      offset: "0",
      limit: pageSize.toString()
    }).toPromise().catch((error: Response) => this.errorHandlingService.handleError(error));
  }
}
