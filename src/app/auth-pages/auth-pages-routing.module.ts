/**
 * Created by Viki on 10/28/2016.
 */

/**
 * Created by AKuzmanoski on 15/10/2016.
 */
import {NgModule} from "@angular/core";
import {AuthPagesRoutes} from "./auth-pages.routes";
import {RouterModule} from "@angular/router";
import {ActivationResolverService} from "./activate-page/activation-resolver.service";
import {VerificationResolverService} from "./verify-page/verification-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild(AuthPagesRoutes)
  ],
  providers: [ActivationResolverService, VerificationResolverService],
  exports: [
    RouterModule
  ]
})
export class AuthPagesRoutingModule {
}