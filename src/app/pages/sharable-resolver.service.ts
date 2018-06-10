import {catchError} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SharableService} from '../domain/services/sharable/sharable.service';
import {Shareable} from '../domain/model/sharing/shareable';
import {ErrorHandlingService} from '../core/error-handling/error-handling.service';

@Injectable()
export class SharableResolverService implements Resolve<Shareable> {

  constructor(private sharableService: SharableService, private errorHandlingService: ErrorHandlingService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Shareable> | Promise<Shareable> | Shareable {
    const id: number = +route.queryParams['sharableId'];
    return this.sharableService.getSharableById(id).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }
}
