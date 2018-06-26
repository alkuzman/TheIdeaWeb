import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Organization} from '../../model/authentication';
import {HttpClient} from '@angular/common/http';

/**
 * Created by Viki on 11/25/2016.
 */

@Injectable()
export class OrganizationService {
  organizationsUrl = '/api/organizations';

  constructor(private http: HttpClient) {
  }

  addOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.organizationsUrl, organization);
  }
}
