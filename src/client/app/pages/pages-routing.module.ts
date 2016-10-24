/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PagesRoutes} from "./pages.routes";

@NgModule({
  imports: [
    RouterModule.forChild(PagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {
}
