/**
 * Created by AKuzmanoski on 02/01/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AnnouncementPagesRoutes} from "./announcement-pages.routes";
@NgModule({
  imports: [RouterModule.forChild(AnnouncementPagesRoutes)],
  exports: [RouterModule]
})
export class AnnouncementPagesRoutingModule {

}
