import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthPageRoutes} from "./auth-page.routes";
/**
 * Created by Viki on 10/29/2016.
 */

@NgModule({
  imports: [RouterModule.forChild(AuthPageRoutes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {
}
