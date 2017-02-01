/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ErrorPagesRoutes} from "./error-pages.routes";
@NgModule({
  imports: [RouterModule.forChild(ErrorPagesRoutes)],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule {

}
