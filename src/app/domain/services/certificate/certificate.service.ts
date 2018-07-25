import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CertificatesFilterProperties} from './certificates-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {HttpClient} from '@angular/common/http';

/**
 * Created by Viki on 2/6/2017.
 */


@Injectable()
export class CertificateService {
  private certificatesUrl = '/api/certificates';
  private idealSecureCertificate = '/protocol/certificates/iDealSecure';

  constructor(private http: HttpClient) {

  }

  public sign(pemCertificationRequest: string): Observable<string> {
    const url: string = this.certificatesUrl + '/sign';
    return this.http.post(url, pemCertificationRequest, {responseType: 'text'});
  }

  public get(filterProperties: CertificatesFilterProperties): Observable<string> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    const url: string = this.certificatesUrl;
    return this.http.get(url, {params: params, responseType: 'text'});
  }

  public getIssuerCertificate(): Observable<string> {
    const url: string = this.certificatesUrl + '/issuer';
    return this.http.get(url, {responseType: 'text'});
  }

  public getPublicKey(filterProperties: CertificatesFilterProperties): Observable<string> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    const url = this.certificatesUrl + '/publickey';
    return this.http.get(url, {params: params, responseType: 'text'});
  }

  public getIdealSecureCertificate(): Observable<string> {
    return this.http.get(this.idealSecureCertificate, {responseType: 'text'});
  }
}
