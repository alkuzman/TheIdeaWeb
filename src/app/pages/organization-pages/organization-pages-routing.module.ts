import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {OrganizationPagesRoutes} from "./organization-pages.routes";
/**
 * Created by Viki on 11/21/2016.
 */


@NgModule({
  imports: [RouterModule.forChild(OrganizationPagesRoutes)],
  exports: [RouterModule]
})
export class OrganizationPagesRoutingModule {
}
