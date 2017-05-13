/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule, CanDeactivate} from "@angular/router";
import {NewIdeaPageRoutes} from "./new-idea-page.routes";
import {DiscardChangesGuard} from "../../../core/guards/discard_changes.guard";

@NgModule({
  imports: [
    RouterModule.forChild(NewIdeaPageRoutes)
  ],
  providers: [
  ],
  exports: [
    RouterModule
  ]
})
export class NewIdeaPageRoutingModule {
}
