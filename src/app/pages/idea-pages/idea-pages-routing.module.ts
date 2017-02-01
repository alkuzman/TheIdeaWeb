/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IdeaPagesRoutes} from "./idea-pages.routes";

@NgModule({
  imports: [
    RouterModule.forChild(IdeaPagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IdeaPagesRoutingModule {
}
