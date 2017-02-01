/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NewIdeaPageRoutes} from "./new-idea-page.routes";

@NgModule({
  imports: [
    RouterModule.forChild(NewIdeaPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NewIdeaPageRoutingModule {
}
