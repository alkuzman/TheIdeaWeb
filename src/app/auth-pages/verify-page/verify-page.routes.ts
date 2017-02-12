import {Routes} from "@angular/router";
import {VerifyPageComponent} from "./verify-page.component";
import {VerificationResolverService} from "./verification-resolver.service";
/**
 * Created by Viki on 2/11/2017.
 */

export const VerifyPageRoutes: Routes = [
  {
    path: '',
    component: VerifyPageComponent,
    resolve: {
      user: VerificationResolverService
    }
  }
];
