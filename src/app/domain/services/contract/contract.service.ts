import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Contract} from '../../model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContractService {
  private contractUrl = '/api/contracts';

  constructor(private http: HttpClient) {
  }

  public getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.contractUrl);
  }
}
