import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TransactionDetailsPageRoutes} from "./transaction-details-page.routes";
import {TransactionDetailsProtocolTransactionStepNoticeResolverService} from "./transaction-details-protocol-transaction-step-notice-resolver.service";
/**
 * Created by Viki on 3/3/2017.
 */



@NgModule({
  imports: [RouterModule.forChild(TransactionDetailsPageRoutes)],
  exports: [RouterModule],
  providers: [TransactionDetailsProtocolTransactionStepNoticeResolverService]
})
export class TransactionDetailsPageRoutingModule {}
