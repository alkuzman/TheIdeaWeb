/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AnnouncementFeedPageRoutes} from "./announcement-feed-page.routes";
import {AnnouncementFeedListResolverService} from "./announcement-feed-list-resolver.service";
@NgModule({
  imports: [RouterModule.forChild(AnnouncementFeedPageRoutes)],
  providers: [AnnouncementFeedListResolverService],
  exports: [RouterModule]
})
export class AnnouncementFeedPageRoutingModule {

}
