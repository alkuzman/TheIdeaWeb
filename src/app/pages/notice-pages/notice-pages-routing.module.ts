/**
 * Created by Viki on 1/24/2017.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NoticePagesRoutes} from "./notice-pages.routes";
@NgModule({
  imports: [RouterModule.forChild(NoticePagesRoutes)],
  exports: [RouterModule]
})
export class NoticePagesRoutingModule {

}
