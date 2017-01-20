/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SearchableListLoaderComponent} from "./components/searchable-list/searchable-list-loader/searchable-list-loader.component";
import {SearchableListComponent} from "./components/searchable-list/searchable-list.component";
import {SearchableCardComponent} from "./components/searchable-card/searchable-card.component";
import {AnnouncementModule} from "../announcement/announcement.module";
@NgModule({
  imports: [SharedModule, AnnouncementModule],
  declarations: [SearchableCardComponent, SearchableListComponent, SearchableListLoaderComponent],
  exports: [SearchableCardComponent, SearchableListComponent, SearchableListLoaderComponent]
})
export class SearchableModule {

}
