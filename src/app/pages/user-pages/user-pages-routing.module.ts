/**
 * Created by AKuzmanoski on 22/12/2016.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UserPagesRoutes} from "./user-pages.routes";
@NgModule({
  imports: [RouterModule.forChild(UserPagesRoutes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule {

}
