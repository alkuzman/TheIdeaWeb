/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Sharable} from "../model/sharing/sharable";
import {Http, Response} from "@angular/http";
@Injectable()
export class SharableService {
  private sharableUrl: string = "/api/sharables";

  constructor(private http: Http) {

  }

  getSharableById(id: number): Observable<Sharable> {
    let url: string = this.sharableUrl + "/" + id;
    return this.http.get(url).map(this.handleRequest);
  }


  handleRequest(response: Response): Sharable {
    let body: Sharable = response.json();
    return body;
  }
}
