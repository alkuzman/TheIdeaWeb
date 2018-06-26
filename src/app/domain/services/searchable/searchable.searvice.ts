import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SearchableFilterProperties} from './searchable-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {Searchable} from '../../model/sharing/searchable';
import {HttpClient} from '@angular/common/http';

/**
 * Created by AKuzmanoski on 20/01/2017.
 */
@Injectable()
export class SearchableService {
  private searchableUrl = '/api/search';

  constructor(private http: HttpClient) {

  }

  public getResults(filter: SearchableFilterProperties): Observable<Searchable[]> {
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get<Searchable[]>(this.searchableUrl, {params: params});
  }
}
