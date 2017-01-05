/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {SharedModule} from "../../../shared/shared.module";
import {NgModule} from "@angular/core";
import {AnnouncementDetailsPageRoutingModule} from "./announcement-details-page-routing.module";
import {AnnouncementDetailsPageComponent} from "./announcement-details-page.component";
import {AnnouncementModule} from "../../../domain/announcement/announcement.module";
@NgModule({
  imports: [SharedModule, AnnouncementModule, AnnouncementDetailsPageRoutingModule],
  declarations: [AnnouncementDetailsPageComponent]
})
export class AnnouncementDetailsPageModule {

}
