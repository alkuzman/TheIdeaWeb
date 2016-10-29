import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RegisterPageRoutes} from "./register-page.routes";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@NgModule({
  imports: [RouterModule.forChild(RegisterPageRoutes)],
  exports: [RouterModule]
})
export class RegisterPageRoutingModule {

}
