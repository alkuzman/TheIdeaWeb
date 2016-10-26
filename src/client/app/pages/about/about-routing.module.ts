/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AboutRoutes} from "./about.routes";

@NgModule({
  imports: [
    RouterModule.forChild(AboutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AboutRoutingModule {
}
