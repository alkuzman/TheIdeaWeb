/**
 * Created by AKuzmanoski on 03/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SharableModule} from "../sharable/sharable.module";
import {AnnouncementFieldsComponent} from "./components/announcement-forms/announcement-fields/announcement-fields.component";
import {AnnouncementFormComponent} from "./components/announcement-forms/announcement-form/announcement-form.component";
import {NewAnnouncementFormComponent} from "./components/announcement-forms/new-announcement-form/new-announcement-form.component";
import {AnnouncementDetailsComponent} from "./components/announcement-details/announcement-details.component";
import {PackageModule} from "../package/package.module";
import {AnnouncementListComponent} from "./components/announcement-list/announcement-list.component";
import {AnnouncementCardComponent} from "./components/announcement-card/announcement-card.component";
import {AnnouncementListLoaderComponent} from "./components/announcement-list/announcement-list-loader.component";
@NgModule({
  imports: [SharedModule, SharableModule, PackageModule],
  declarations: [AnnouncementFieldsComponent, AnnouncementFormComponent, NewAnnouncementFormComponent, AnnouncementDetailsComponent, AnnouncementCardComponent, AnnouncementListComponent, AnnouncementListLoaderComponent],
  exports: [AnnouncementFieldsComponent, AnnouncementFormComponent, NewAnnouncementFormComponent, AnnouncementDetailsComponent, AnnouncementCardComponent, AnnouncementListComponent, AnnouncementListLoaderComponent]
})
export class AnnouncementModule {

}
