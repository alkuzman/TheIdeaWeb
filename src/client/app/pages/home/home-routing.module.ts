/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeRoutes} from "./home.routes";
import {CategoryResolverService} from "./category-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild(HomeRoutes)
  ],
  providers: [
    CategoryResolverService
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
