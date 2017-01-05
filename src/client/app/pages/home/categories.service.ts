/**
 * Created by AKuzmanoski on 20/12/2016.
 */
import {Injectable, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Category} from "./category";
@Injectable()
export class CategoriesService {

  constructor(private http: Http) {

  }

  public get categories(): Observable<Category[]> {
    return this.http.get("/assets/data/categories/main-categories.json")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }
}
