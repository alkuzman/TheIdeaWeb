import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {NewAnnouncementPageComponent} from "./new-annoucement-page.component";
import {NewAnnouncementPageRoutingModule} from "./new-announcement-pages-routing.module";
import {AnnouncementModule} from "../../../domain/announcement/announcement.module";
/**
 * Created by AKuzmanoski on 02/01/2017.
 */
@NgModule({
  imports: [SharedModule, NewAnnouncementPageRoutingModule, AnnouncementModule],
  declarations: [NewAnnouncementPageComponent]
})
export class NewAnnouncementPageModule {

}
