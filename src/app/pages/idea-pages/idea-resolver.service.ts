import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Idea} from '../../domain/model/ideas';
import {Observable} from 'rxjs';
import {IdeaService} from '../../domain/services/idea/idea.service';
import {ErrorHandlingService} from '../../core/error-handling/error-handling.service';

/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@Injectable()
export class IdeaResolverService implements Resolve<Idea> {
  constructor(private ideaService: IdeaService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Idea> | Promise<Idea> | Idea {
    const ideaId: number = +route.params['id'];

    return this.ideaService.getIdea(ideaId).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }
}
