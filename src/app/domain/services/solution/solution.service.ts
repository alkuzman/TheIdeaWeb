import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Solution} from '../../model/ideas';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';

@Injectable()
export class SolutionService {
    private solutionsUrl = "/api/solutions";

    constructor(private http: JwtHttpService) {

    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return observableThrowError(error);
    }

    private getHeaders(): Headers {
        return new Headers({'Content-Type': 'application/json'});
    }

    addSolution(solution: Solution): Observable<Solution> {
        const body = JSON.stringify(solution);
        return this.http.post(this.solutionsUrl, body, {headers: this.getHeaders()}, true).pipe(
            map((response: Response) => this.extractData(response)),
            catchError((error: any) => this.handleError(error)));
    }

    getSolution(ideaId: number): Observable<Solution> {
        const url: string = this.solutionsUrl + "/idea?ideaId=" + ideaId;
        return this.http.get(url, {headers: this.getHeaders()}, true).pipe(
            map((response: Response) => this.extractData(response)),
            catchError((error: any) => this.handleError(error)));
    }
}
