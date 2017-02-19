import {NgModule} from "@angular/core";
import {NewTransactionPageComponent} from "./new-transaction-page.component";
import {NewTransactionPageRoutingModule} from "./new-transaction-page-routing.module";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [NewTransactionPageRoutingModule],
  declarations: [NewTransactionPageComponent],
  exports: [NewTransactionPageComponent]
})
export class NewTransactionPageModule {
}
