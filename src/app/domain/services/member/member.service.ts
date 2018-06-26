import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Member} from '../../model/authentication';
import {HttpClient} from '@angular/common/http';

/**
 * Created by Viki on 2/16/2017.
 */


@Injectable()
export class MemberService {

  membersUrl = '/api/members';

  constructor(private http: HttpClient) {
  }

  save(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member);
  }
}
