/**
 * Created by AKuzmanoski on 19/02/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {KeywordSearchComponent} from "./components/keyword-search/keyword-search.component";
import {KeywordSelectorComponent} from "./components/keyword-selector/keyword-selector.component";
@NgModule({
  imports: [SharedModule],
  declarations: [KeywordSearchComponent, KeywordSelectorComponent],
  exports: [KeywordSearchComponent, KeywordSelectorComponent]
})
export class KeywordModule {

}
