import {Routes} from "@angular/router";
import {TransactionDetailsPageComponent} from "./transaction-details-page.component";
import {TransactionDetailsProtocolTransactionStepNoticeResolverService} from "./transaction-details-protocol-transaction-step-notice-resolver.service";
/**
 * Created by Viki on 2/19/2017.
 */

export const TransactionDetailsPageRoutes: Routes = [
  {
    path: '',
    component: TransactionDetailsPageComponent,
    resolve: {
      notice: TransactionDetailsProtocolTransactionStepNoticeResolverService
    }
  }
];
