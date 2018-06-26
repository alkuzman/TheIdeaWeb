import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 11/10/2016.
 */
import {Injectable} from '@angular/core';
import {Idea} from '../../model/ideas';
import {Headers, Response} from '@angular/http';
import {IdeasFilterProperties} from '../../idea/params/ideas-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class IdeaService {
  private ideasUrl = '/api/ideas';

  constructor(private http: HttpClient) {

  }

  getIdeas(filterProperties: IdeasFilterProperties): Observable<Idea[]> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get<Idea[]>(this.ideasUrl, {params: params});
  }

  getIdea(id: number): Observable<Idea> {
    const url = this.ideasUrl + '/' + id;
    return this.http.get<Idea>(url);
  }

  addIdea(idea: Idea): Observable<Idea> {
    return this.http.post<Idea>(this.ideasUrl, idea);
  }
}
