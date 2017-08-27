import {Injectable} from '@angular/core';
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {Observable} from "rxjs/Observable";
import {Headers, Response} from "@angular/http";
import {Epoid} from "../../model/security/data/epoid";
import {ProtocolSession} from "../../model/security/protocol-session";

@Injectable()
export class ProtocolTransactionService {
    private epoidUrl: string = "/protocol/epoid";
    private transactionUrl: string = "/api/protocoltransactions";

    constructor(private http: JwtHttpService) {

    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private extractRawData(res: Response) {
        return res.text() || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
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

    public getNewEpoid(merchant: string): Observable<Epoid> {
        const url = this.epoidUrl + "/new?merchant=" + merchant;
        return this.http.get(url, {headers: this.getHeaders()}, false)
            .map((response: Response) => this.extractRawData(response))
            .catch((error: any) => this.handleError(error));
    }

    public saveProtocolSession(protocolSession: ProtocolSession): Observable<ProtocolSession> {
        const url = this.transactionUrl + "/session/" + protocolSession.id;
        const body = JSON.stringify(protocolSession);
        return this.http.put(url, body, {headers: this.getHeaders()}, false)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

}
