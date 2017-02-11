/**
 * Created by AKuzmanoski on 22/12/2016.
 */
import {RouterModule} from "@angular/router";
import {UserDetailsPageRoutes} from "./user-details-page.routes";
import {NgModule} from "@angular/core";
import {UserResolverService} from "./user-resolver.service";
@NgModule({
  imports: [RouterModule.forChild(UserDetailsPageRoutes)],
  providers: [UserResolverService],
  exports: [RouterModule]
})
export class UserDetailsPageRoutingModule {

}
