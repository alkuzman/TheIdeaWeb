import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorHandlingService} from '../../core/error-handling/error-handling.service';
import {Solution} from '../../domain/model/ideas';
import {SolutionService} from '../../domain/services/solution/solution.service';

/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@Injectable()
export class SolutionResolverService implements Resolve<Solution> {
  constructor(private solutionService: SolutionService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Solution> | Promise<Solution> | Solution {
    const solutionId: number = +route.params['id'];

    return this.solutionService.getSolution(solutionId).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }
}
