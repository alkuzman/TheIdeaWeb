import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IdeasPageRoutes} from "./ideas-page.routes";
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
@NgModule({
  imports: [
    RouterModule.forChild(IdeasPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IdeasPageRoutingModule {
}
