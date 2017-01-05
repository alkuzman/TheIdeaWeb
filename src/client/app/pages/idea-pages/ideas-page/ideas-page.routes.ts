import {IdeasPageComponent} from "./ideas-page.component";
import {Route} from "@angular/router";
import {IdeaListResolverService} from "./idea-list-resolver.service";
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
export const IdeasPageRoutes: Route[] = [
  {
    path: '',
    component: IdeasPageComponent,
    resolve: {
      ideas: IdeaListResolverService
    }
  }
];
