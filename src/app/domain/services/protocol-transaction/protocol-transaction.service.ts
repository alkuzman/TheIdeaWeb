import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Epoid} from '../../model/security/data/epoid';
import {ProtocolSession} from '../../model/security/protocol-session';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProtocolTransactionService {
  private epoidUrl = '/protocol/epoid';
  private sessionKeyWithServerUrl = '/protocol/keys';
  private transactionUrl = '/api/protocoltransactions';
  private transactionRequestUrl = '/protocol/transactions';

  constructor(private http: HttpClient) {

  }

  public getNewEpoid(merchant: string): Observable<Epoid> {
    const url = this.epoidUrl + '/new?merchant=' + merchant;
    return this.http.get<Epoid>(url);
  }

  public saveProtocolSession(protocolSession: ProtocolSession): Observable<ProtocolSession> {
    const url = this.transactionUrl + '/session/' + protocolSession.id;
    return this.http.put<ProtocolSession>(url, ProtocolSession);
  }

  public getSessionKeyWithServer(email: string): Observable<string> {
    const url = this.sessionKeyWithServerUrl + '?email=' + email + '&applicationName=iDeal';
    return this.http.get(url, {responseType: 'text'});
  }

  public sendTransactionRequestToServer(jsonMessage: string, email: string): Observable<string> {
    const url = this.transactionRequestUrl + '?email=' + email + '&applicationName=iDeal';
    return this.http.post(url, jsonMessage, {responseType: 'text'});
  }
}
