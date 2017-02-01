import {Routes} from "@angular/router";
import {UserDetailsPageComponent} from "./user-details-page.component";
import {UserResolverService} from "./user-resolver.service";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

export const UserDetailsPageRoutes: Routes = [
  {
    path: "",
    component: UserDetailsPageComponent,
    resolve: {user: UserResolverService}
  }
];
