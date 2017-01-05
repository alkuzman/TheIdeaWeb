/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Routes} from "@angular/router";
import {ProblemsPageComponent} from "./problems-page.component";
import {ProblemListResolverService} from "./problem-list-resolver.service";
/**
 * Created by AKuzmanoski on 19/10/2016.
 */
export const ProblemsPageRoutes: Routes = [
  {
    path: '',
    component: ProblemsPageComponent,
    resolve: {
      problems: ProblemListResolverService
    }
  }
];
