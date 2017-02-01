/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AnnouncementDetailsPageRoutes} from "./announcement-details-page.routes";
import {AnnouncementResolverService} from "./announcement-resolver.service";
@NgModule({
  imports: [RouterModule.forChild(AnnouncementDetailsPageRoutes)],
  providers: [AnnouncementResolverService],
  exports: [RouterModule]
})
export class AnnouncementDetailsPageRoutingModule {

}
