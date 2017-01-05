import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Idea} from "../../../domain/model/ideas/idea";
import {Observable} from "rxjs";
import {IdeaService} from "../../../domain/idea/idea.service";
import {Response} from "@angular/http";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@Injectable()
export class IdeaResolverService implements Resolve<Idea>{
  constructor(private ideaService: IdeaService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Idea>|Promise<Idea>|Idea {
    let ideaId: number = +route.params["id"];

    return this.ideaService.getIdea(ideaId).toPromise().catch((error: any) => this.errorHandlingService.handleError(error));
  }
}
