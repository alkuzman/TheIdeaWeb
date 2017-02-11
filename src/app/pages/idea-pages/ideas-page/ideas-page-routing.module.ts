import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IdeasPageRoutes} from "./ideas-page.routes";
import {IdeaListResolverService} from "./idea-list-resolver.service";
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
@NgModule({
  imports: [
    RouterModule.forChild(IdeasPageRoutes)
  ],
  providers: [
    IdeaListResolverService
  ],
  exports: [
    RouterModule
  ]
})
export class IdeasPageRoutingModule {
}
