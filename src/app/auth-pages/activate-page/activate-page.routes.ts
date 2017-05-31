import {Routes} from "@angular/router";
import {ActivatePageComponent} from "./components/activate-page.component";
import {ActivationResolverService} from "./activation-resolver.service";
/**
 * Created by Viki on 2/11/2017.
 */

export const ActivatePageRoutes: Routes = [
  {
    path: '',
    component: ActivatePageComponent,
    resolve: {
      user: ActivationResolverService
    }
  }
];
