import {Routes} from "@angular/router";
import {ProblemDetailsPageComponent} from "./problem-details-page.component";
import {ProblemResolverService} from "./problem-resolver.service";
/**
 * Created by AKuzmanoski on 14/11/2016.
 */
export const ProblemDetailsPageRoutes: Routes = [
  {
    path: '',
    component: ProblemDetailsPageComponent,
    resolve: {
      problem: ProblemResolverService
    }
  }
];
