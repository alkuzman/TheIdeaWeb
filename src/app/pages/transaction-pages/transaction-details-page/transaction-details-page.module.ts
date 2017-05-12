import {NgModule} from "@angular/core";
import {TransactionDetailsPageRoutingModule} from "./transaction-details-page-routing.module";
import {TransactionDetailsPageComponent} from "./transaction-details-page.component";
import {ProtocolTransactionModule} from "../../../domain/protocol-transaction/protocol-transaction.module";
/**
 * Created by Viki on 3/3/2017.
 */
@NgModule({
  imports: [TransactionDetailsPageRoutingModule, ProtocolTransactionModule],
  declarations: [TransactionDetailsPageComponent],
  exports: [TransactionDetailsPageComponent]
})
export class TransactionDetailsPageModule {}
