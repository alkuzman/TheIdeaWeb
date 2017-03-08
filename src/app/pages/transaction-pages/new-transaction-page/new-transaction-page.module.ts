import {NgModule} from "@angular/core";
import {NewTransactionPageComponent} from "./new-transaction-page.component";
import {NewTransactionPageRoutingModule} from "./new-transaction-page-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {ProtocolTransactionModule} from "../../../domain/protocol-transaction/protocol-transaction.module";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [SharedModule, ProtocolTransactionModule, NewTransactionPageRoutingModule],
  declarations: [NewTransactionPageComponent],
  exports: [NewTransactionPageComponent]
})
export class NewTransactionPageModule {
}
