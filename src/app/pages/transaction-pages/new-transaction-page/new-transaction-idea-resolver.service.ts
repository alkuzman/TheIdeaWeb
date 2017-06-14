import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Idea} from "../../../domain/model/ideas/idea";
import {Observable} from "rxjs";
import {IdeaService} from "../../../domain/services/idea/idea.service";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@Injectable()
export class NewTransactionIdeaResolverService implements Resolve<Idea> {
  constructor(private ideaService: IdeaService, private errorHandlingService: ErrorHandlingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Idea>|Promise<Idea>|Idea {
    let ideaId: number = +route.queryParams["ideaId"];

    return this.ideaService.getIdea(ideaId).catch((error: any) => this.errorHandlingService.handleError(error));
  }
}
