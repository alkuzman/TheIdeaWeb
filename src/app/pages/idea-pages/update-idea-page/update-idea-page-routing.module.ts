/**
 * Created by VikiPeeva on 01/07/2018.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UpdateIdeaPageRoutes} from "./update-idea-page.routes";

@NgModule({
  imports: [
    RouterModule.forChild(UpdateIdeaPageRoutes)
  ],
  providers: [
  ],
  exports: [
    RouterModule
  ]
})
export class UpdateIdeaPageRoutingModule {
}
