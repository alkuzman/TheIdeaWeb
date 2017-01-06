/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Idea} from "../../../domain/model/ideas/idea";
import {Observable} from "rxjs";
import {IdeaService} from "../../../domain/idea/idea.service";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
@Injectable()
export class IdeaListResolverService implements Resolve<Idea[]> {
  constructor(private ideaService: IdeaService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Idea[]>|Promise<Idea[]>|Idea[] {
    return this.ideaService.getIdeas({}).toPromise().catch((error: any) => this.errorHandlingService.handleError(error));
  }
}
