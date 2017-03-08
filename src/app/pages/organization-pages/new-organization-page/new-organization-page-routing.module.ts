import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NewOrganizationPageRoutes} from "./new-organization-page.routes";
/**
 * Created by Viki on 11/21/2016.
 */


@NgModule({
  imports: [RouterModule.forChild(NewOrganizationPageRoutes)],
  exports: [RouterModule]
})
export class NewOrganizationPageRoutingModule {

}
