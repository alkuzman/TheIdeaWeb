import {catchError} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Idea} from '../../../domain/model/ideas';
import {Observable} from 'rxjs';
import {IdeaService} from '../../../domain/services/idea/idea.service';
import {ErrorHandlingService} from '../../../core/error-handling/error-handling.service';

@Injectable()
export class IdeaListResolverService implements Resolve<Idea[]> {
  constructor(private ideaService: IdeaService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Idea[]> | Promise<Idea[]> | Idea[] {
    return this.ideaService.getIdeas({}).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }
}
