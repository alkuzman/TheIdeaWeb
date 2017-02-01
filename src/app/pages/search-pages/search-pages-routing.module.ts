/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SearchPagesRoutes} from "./search-pages.routes";
@NgModule({
  imports: [RouterModule.forChild(SearchPagesRoutes)],
  exports: [RouterModule]
})
export class SearchPagesRoutingModule {

}
