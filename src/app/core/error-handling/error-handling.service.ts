import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@Injectable()
export class ErrorHandlingService {
  constructor(private router: Router) {
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.router.navigate(['/errors', 'page-not-found']);
      return null;
    } else {
      return throwError(error);
    }
  }
}
