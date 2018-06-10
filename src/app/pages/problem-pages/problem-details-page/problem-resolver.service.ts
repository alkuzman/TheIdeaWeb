import {catchError} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Problem} from '../../../domain/model/ideas';
import {Observable} from 'rxjs';
import {ProblemService} from '../../../domain/services/problem/problem.service';
import {ErrorHandlingService} from '../../../core/error-handling/error-handling.service';

@Injectable()
export class ProblemResolverService implements Resolve<Problem> {
  constructor(private problemService: ProblemService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Problem>|Promise<Problem>|Problem {
    const problemId: number = +route.params["id"];
    return this.problemService.getProblem(problemId).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }
}
