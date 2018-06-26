import {Observable} from 'rxjs';
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from '@angular/core';
import {Shareable} from '../../model/sharing/shareable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SharableService {
  private sharableUrl = '/api/shareables';

  constructor(private http: HttpClient) {

  }

  getSharableById(id: number): Observable<Shareable> {
    const url: string = this.sharableUrl + '/' + id;
    return this.http.get<Shareable>(url);
  }
}
