import {Injectable} from "@angular/core";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Currency} from "../../model/helpers/currency";
/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class CurrencyService {
  private currenciesUrl: string = "/api/currencies";

  constructor(private http: JwtHttpService) {
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get(this.currenciesUrl, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

}
