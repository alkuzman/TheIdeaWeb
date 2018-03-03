import {NgModule} from "@angular/core";
import {IdeaDetailsPageRoutes} from "./idea-details-page.routes";
import {RouterModule} from "@angular/router";
import {IdeaResolverService} from "../idea-resolver.service";
/**
 * Created by AKuzmanoski on 03/12/2016.
 */
@NgModule({
  imports: [
    RouterModule.forChild(IdeaDetailsPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IdeaDetailsPageRoutingModule {
}
