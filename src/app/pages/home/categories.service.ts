/**
 * Created by AKuzmanoski on 20/12/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Category} from "./category";
import {LoadingService} from "../../core/loading/loading.service";
@Injectable()
export class CategoriesService {

  constructor(private http: Http, private loadingService: LoadingService) {

  }

  private extractData(response: Response) {
    this.loadingService.loadingDone();
    return response.json();
  }

  public get categories(): Observable<Category[]> {
    this.loadingService.load();
    return this.http.get("/assets/data/categories/main-categories.json")
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  private handleError(error: any) {
    this.loadingService.loadingDone();
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }
}
