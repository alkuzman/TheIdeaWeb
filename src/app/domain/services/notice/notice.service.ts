/**
 * Created by Viki on 1/26/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PropertiesToUrlSearchParams} from "../../../shared/utils/properties-to-url-search-params";
import {Headers, Response} from "@angular/http";
import {StandardFilterProperties} from "../standard-filter.properties";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {NoticeFilterProperties} from "./notice-filter-properties";
import {Notice} from "../../model/sharing/notice";
@Injectable()
export class NoticeService {
    private noticesUrl = "/api/notices";

    constructor(private http: JwtHttpService) {

    }

    public searchNotices(filter: StandardFilterProperties): Observable<Notice[]> {
        let params = PropertiesToUrlSearchParams.transform(filter);
        return this.http.get(this.noticesUrl, {headers: this.getHeaders(), search: params}, true)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    public addNotice(notice: Notice): Observable<Notice> {
        let body = JSON.stringify(notice);
        return this.http.post(this.noticesUrl, body, {headers: this.getHeaders()}, true)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    public getNotice(id: number) {
        let url: string = this.noticesUrl + "/" + id;
        return this.http.get(url, {headers: this.getHeaders()}, true)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    public getNoticeCount(): Observable<number> {
        let url = this.noticesUrl + "/count";
        return this.http.get(url, undefined, true)
            .map((response: Response) => +this.extractRawData(response))
            .catch((error: any) => this.handleError(error));
    }

    public markAsSeen(): Observable<void> {
        let url = this.noticesUrl + "/seen";
        return this.http.put(url, undefined, undefined, true)
            .map((response: Response) => response)
            .catch((error: any) => this.handleError(error));
    }

    getAnnouncementList(filter?: NoticeFilterProperties): Observable<Notice[]> {
        if (filter == null)
            filter = {};
        let params = PropertiesToUrlSearchParams.transform(filter);
        return this.http.get(this.noticesUrl, {headers: this.getHeaders(), search: params}, true)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    private extractRawData(res: Response) {
        return res.text();
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
        return Observable.throw(error);
    }

    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
