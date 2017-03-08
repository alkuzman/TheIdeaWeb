import {Routes} from "@angular/router";
import {NewIdeaPageComponent} from "./new-idea-page-component";
import {CanDeactivateIdeaFormGuard} from "./can-deactivate-idea-form.guard";
/**
 * Created by AKuzmanoski on 25/10/2016.
 */
export const NewIdeaPageRoutes: Routes = [
  {
    path: "",
    component: NewIdeaPageComponent,
    canDeactivate: [CanDeactivateIdeaFormGuard]
  }
];
