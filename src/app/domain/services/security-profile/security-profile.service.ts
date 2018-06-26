import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {SecurityProfile} from '../../model/security/security-profile';
import {CertificateType} from '../../model/enumerations';
import {HttpClient} from '@angular/common/http';

/**
 * Created by Viki on 2/6/2017.
 */


@Injectable()
export class SecurityProfileService {
  private securityprofilesUrl = '/api/securityprofiles';

  constructor(private http: HttpClient) {

  }

  public save(securityProfile: SecurityProfile): Observable<SecurityProfile> {
    return this.http.post<SecurityProfile>(this.securityprofilesUrl, securityProfile);
  }

  public getAuthenticatedUserSecurityProfile(type: CertificateType): Observable<SecurityProfile> {
    const url: string = this.securityprofilesUrl;
    return this.http.get<SecurityProfile>(url);
  }
}
