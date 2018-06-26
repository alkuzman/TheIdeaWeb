import {Observable} from 'rxjs';
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
import {Injectable} from '@angular/core';
import {Problem} from '../../model/ideas';
import {ProblemListFilterProperties} from '../../problem/params/problem-list-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ProblemService {
  private problemsUrl = '/api/problems';

  constructor(private http: HttpClient) {

  }

  getProblems(properties: ProblemListFilterProperties): Observable<Problem[]> {
    const params = PropertiesToUrlSearchParams.transform(properties);
    return this.http.get<Problem[]>(this.problemsUrl, {params: params});
  }

  getProblem(id: number): Observable<Problem> {
    const url = this.problemsUrl + '/' + id;
    return this.http.get<Problem>(url);
  }

  addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(this.problemsUrl, problem);
  }
}
