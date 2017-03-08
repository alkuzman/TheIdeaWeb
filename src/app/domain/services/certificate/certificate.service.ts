import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response, Headers} from "@angular/http";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
/**
 * Created by Viki on 2/6/2017.
 */


@Injectable()
export class CertificateService {
  private certificatesUrl: string = "/api/certificates";

  constructor(private http: JwtHttpService) {

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
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public sign(pemCertificationRequest: string): Observable<string> {
    let url: string = this.certificatesUrl + "/sign";
    return this.http.post(url, pemCertificationRequest, {headers: this.getHeaders()})
      .map((response: Response) => response.text())
      .catch((error: any) => this.handleError(error));
  }

  public get() {
    let url: string = this.certificatesUrl + "/get";
    console.log(url);
    this.http.get(url, {headers: this.getHeaders()}).map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public save(securityProfile: SecurityProfile): Observable<SecurityProfile> {
    let url: string = this.certificatesUrl + "/save";
    return this.http.post(url, JSON.stringify(securityProfile), {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}