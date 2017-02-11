/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Problem} from "../../../domain/model/ideas/problem";
import {Observable} from "rxjs";
import {ProblemService} from "../../../domain/services/problem/problem.service";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
@Injectable()
export class ProblemListResolverService implements Resolve<Problem[]> {
  constructor(private problemService: ProblemService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Problem[]>|Promise<Problem[]>|Problem[] {
    return this.problemService.getProblems({}).toPromise().catch((error: any) => this.errorHandlingService.handleError(error));
  }
}
