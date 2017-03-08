import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {CurrencySelectComponent} from "./currency-select/currency-select.component";
/**
 * Created by Viki on 2/21/2017.
 */


@NgModule({
  imports: [SharedModule],
  declarations: [CurrencySelectComponent],
  exports: [CurrencySelectComponent]
})
export class CurrencyModule {

}
