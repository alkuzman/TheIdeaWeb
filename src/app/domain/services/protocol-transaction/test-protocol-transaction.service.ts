import {Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TestProtocolTransactionService {

  private url = '/protocol/test';

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  public sendForDecryption(encryptedText: string): Observable<string> {
    const url: string = this.url + '/decrypt?email=' + this.userService.getAuthenticatedUser().email +
      '&applicationName=iDeal';
    return this.http.post<string>(url, encryptedText);
  }

  public sendForAsynchronousDecryption(data: string): Observable<string> {
    const url: string = this.url + '/decrypt/key';
    return this.http.post<string>(url, data);
  }
}
