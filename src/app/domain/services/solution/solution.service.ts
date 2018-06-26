import {Observable} from 'rxjs';
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Injectable} from '@angular/core';
import {Solution} from '../../model/ideas';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SolutionService {
  private solutionsUrl = '/api/solutions';

  constructor(private http: HttpClient) {

  }

  addSolution(solution: Solution): Observable<Solution> {
    return this.http.post<Solution>(this.solutionsUrl, solution);
  }

  getSolution(ideaId: number): Observable<Solution> {
    const url: string = this.solutionsUrl + '/idea?ideaId=' + ideaId;
    return this.http.get<Solution>(url);
  }
}
