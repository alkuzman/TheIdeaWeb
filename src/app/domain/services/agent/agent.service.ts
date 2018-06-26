import {Observable} from 'rxjs';
/**
 * Created by Viki on 1/25/2017.
 */
import {Injectable} from '@angular/core';
import {Agent} from '../../model/authentication';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {AgentFilterProperties} from './agent-filter.properties';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AgentService {
  private agentsUrl = '/api/agents';

  constructor(private http: HttpClient) {

  }

  public getAgents(filterProperties: AgentFilterProperties): Observable<Agent[]> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get<Agent[]>(this.agentsUrl, {params: params});
  }
}
