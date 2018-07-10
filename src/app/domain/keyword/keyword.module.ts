/**
 * Created by AKuzmanoski on 19/02/2017.
 */
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {KeywordSelectorComponent} from './components/keyword-selector/keyword-selector.component';

@NgModule({
  imports: [SharedModule],
  declarations: [KeywordSelectorComponent],
  exports: [KeywordSelectorComponent]
})
export class KeywordModule {

}
