/**
 * Created by AKuzmanoski on 08/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {AnnouncementFeedPageComponent} from "./announcement-feed-page.component";
import {AnnouncementFeedPageRoutingModule} from "./announcement-feed-page-routing.module";
import {AnnouncementModule} from "../../../domain/announcement/announcement.module";
@NgModule({
  imports: [SharedModule, AnnouncementModule, AnnouncementFeedPageRoutingModule],
  declarations: [AnnouncementFeedPageComponent]
})
export class AnnouncementFeedPageModule {

}
