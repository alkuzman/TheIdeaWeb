import {Routes} from "@angular/router";
import {NewIdeaPageComponent} from "./new-idea-page-component";
import {DiscardChangesGuard} from "../../../core/guards/discard_changes.guard";
/**
 * Created by AKuzmanoski on 25/10/2016.
 */
export const NewIdeaPageRoutes: Routes = [
  {
    path: "",
    component: NewIdeaPageComponent,
    canDeactivate: [DiscardChangesGuard]
  }
];
