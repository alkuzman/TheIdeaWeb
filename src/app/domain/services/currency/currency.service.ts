import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Currency} from '../../model/helpers/currency';
import {HttpClient} from '@angular/common/http';

/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class CurrencyService {
  private currenciesUrl = '/api/currencies';

  constructor(private http: HttpClient) {
  }

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currenciesUrl);
  }
}
