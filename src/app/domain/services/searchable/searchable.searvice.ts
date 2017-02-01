import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {SearchableFilterProperties} from "./searchable-filter.properties";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import {LoadingService} from "../../../core/loading/loading.service";
import {Observable} from "rxjs";
import {Searchable} from "../../model/sharing/searchable";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
/**
 * Created by AKuzmanoski on 20/01/2017.
 */
@Injectable()
export class SearchableService {
  private searchableUrl = "/api/search";

  constructor(private http: JwtHttpService) {

  }

  public getResults(filter: SearchableFilterProperties): Observable<Searchable[]> {
    let params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.searchableUrl, {headers: this.getHeaders(), search: params})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
