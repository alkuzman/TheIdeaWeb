import {Observable} from 'rxjs';
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
import {Injectable} from '@angular/core';
import {SolutionQuality} from '../../model/analyzers/analysis/solution-quality';
import {Award} from '../../model/awards/award';
import {Badge} from '../../model/awards/badges/badge';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AwardService {
  private awardsUrl = '/api/awards';

  constructor(private http: HttpClient) {

  }

  public generateAwards(solutionQuality: SolutionQuality): Observable<Award<Badge<any, any>>[]> {
    const url: string = this.awardsUrl + '/factory';
    return this.http.post<Award<Badge<any, any>>[]>(url, solutionQuality);

  }
}
