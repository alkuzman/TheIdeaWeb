import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AnnouncementPagesComponent} from "./announcement-pages.component";
import {AnnouncementPagesRoutingModule} from "./announcement-pages-routing.module";
/**
 * Created by AKuzmanoski on 02/01/2017.
 */
@NgModule({
  imports: [SharedModule, AnnouncementPagesRoutingModule],
  declarations: [AnnouncementPagesComponent]
})
export class AnnouncementPagesModule {

}
