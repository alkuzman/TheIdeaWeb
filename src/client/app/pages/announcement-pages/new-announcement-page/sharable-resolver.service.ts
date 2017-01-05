/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {SharableService} from "../../../domain/sharable/sharable.service";
import {Sharable} from "../../../domain/model/sharing/sharable";
import {Response} from "@angular/http";
@Injectable()
export class SharableResolverService implements Resolve<Sharable> {

  constructor(private sharableService: SharableService, private router: Router) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sharable>|Promise<Sharable>|Sharable {
    let id: number = +route.queryParams["sharableId"];
    return this.sharableService.getSharableById(id).toPromise().catch((error: any) => this.handleError(error));
  }

  handleError(error: Response) {
    if (error.status == 404) {
      this.router.navigate(["/errors", "page-not-found"]);
      return null;
    }
    else
      return Observable.throw(error);
  }
}
