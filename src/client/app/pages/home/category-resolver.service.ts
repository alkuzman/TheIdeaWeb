/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Category} from "./category";
import {Observable} from "rxjs";
import {CategoriesService} from "./categories.service";
import {ErrorHandlingService} from "../../core/error-handling/error-handling.service";
@Injectable()
export class CategoryResolverService implements Resolve<Category[]> {

  constructor(private categoryService: CategoriesService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]>|Promise<Category[]>|Category[] {
    return this.categoryService.categories.toPromise().catch((error: any) => this.errorHandlingService.handleError(error));
  }
}
