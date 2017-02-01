/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharableModule} from "../../domain/sharable/sharable.module";
import {SearchPageComponent} from "./search-page.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchPagesRoutingModule} from "./search-pages-routing.module";
import {SearchableModule} from "../../domain/searchable/searchable.module";
@NgModule({
  imports: [SharedModule, SearchableModule, SearchPagesRoutingModule],
  declarations: [SearchPageComponent]
})
export class SearchPagesModule {

}
