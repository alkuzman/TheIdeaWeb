/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Announcement} from "../../../domain/model/sharing/announcement";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AnnouncementService} from "../../../domain/announcement/announcement.service";
import {Response} from "@angular/http";
@Injectable()
export class AnnouncementResolverService implements Resolve<Announcement> {
  constructor(private announcementService: AnnouncementService, private router: Router) {


  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcement>|Promise<Announcement>|Announcement {
    let id = route.params['id'];
    return this.announcementService.getAnnouncementById(id).toPromise().catch((onrejected?:{reasons: any}) => this.handleError(onrejected));
  }

  handleError(error: any) {
    if (error.status == 404) {
      this.router.navigate(["/errors", "page-not-found"]);
      return null;
    }
    return Observable.throw(error);
  }


}
