import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {Contract} from '../../model';
import {Headers, Response} from '@angular/http';

@Injectable()
export class ContractService {
    private contractUrl = "/api/contracts";

    constructor(private http: JwtHttpService) {
    }

    public getContracts(): Observable<Contract[]> {
        return this.http.get(this.contractUrl, {headers: this.getHeaders()}).pipe(
            map((response: Response) => this.extractData(response)),
            catchError((error: any) => this.handleError(error)));
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return observableThrowError(error);
    }

    private getHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
