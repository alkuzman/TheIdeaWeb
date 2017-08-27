import {Injectable} from "@angular/core";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {Observable} from "rxjs/Observable";
import {Contract} from "../../model/payment/contract";
import {Headers, Response} from "@angular/http";

@Injectable()
export class ContractService {
    private contractUrl = "/api/contracts";

    constructor(private http: JwtHttpService) {
    }

    public getContracts(): Observable<Contract[]> {
        return this.http.get(this.contractUrl, {headers: this.getHeaders()})
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
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
}