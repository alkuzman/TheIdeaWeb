import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@Injectable()
export class ErrorHandlingService {
  constructor(private router: Router) {

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
