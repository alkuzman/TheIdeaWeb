/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Sharable} from "../../model/sharing/sharable";
import {Http, Response} from "@angular/http";
import {LoadingService} from "../../../core/loading/loading.service";
@Injectable()
export class SharableService {
  private sharableUrl: string = "/api/sharables";

  constructor(private http: Http, private loadingService: LoadingService) {

  }

  getSharableById(id: number): Observable<Sharable> {
    this.loadingService.load();
    let url: string = this.sharableUrl + "/" + id;
    return this.http.get(url)
      .map((response: Response) => this.handleRequest(response))
      .catch((error: any) => this.handleError(error));
  }


  handleRequest(response: Response): Sharable {
    this.loadingService.loadingDone();
    let body: Sharable = response.json();
    return body;
  }

  handleError(error: any) {
    this.loadingService.loadingDone();
    return Observable.throw(error);
  }
}
