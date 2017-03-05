import {Injectable} from "@angular/core";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {Observable} from "rxjs";
import {BuyingTransaction} from "../../model/security/buying-transaction";
import {Headers, Response} from "@angular/http";
/**
 * Created by Viki on 3/3/2017.
 */


@Injectable()
export class BuyingTransactionService {
  private buyingTransactionUrl: string = "/api/buyingtransaction";

  constructor(private http: JwtHttpService) {

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
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getBuyingTransaction(id: number): Observable<BuyingTransaction> {
    let url = this.buyingTransactionUrl + "/" + id;
    return this.http.get(url, {headers: this.getHeaders()}, true)
      .map((res: Response) => this.extractData(res))
      .catch((err: any) => this.handleError(err));
  }
}
