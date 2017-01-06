import {Routes} from "@angular/router";
import {IdeaDetailsPageComponent} from "./idea-details-page.component";
import {IdeaResolverService} from "./idea-resolver.service";
/**
 * Created by AKuzmanoski on 03/12/2016.
 */
export const IdeaDetailsPageRoutes: Routes = [
  {
    path: "",
    component: IdeaDetailsPageComponent,
    resolve: {
      idea: IdeaResolverService
    }
  }
];
