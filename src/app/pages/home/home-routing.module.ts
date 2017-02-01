/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeRoutes} from "./home.routes";

@NgModule({
  imports: [
    RouterModule.forChild(HomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
