import {Routes} from "@angular/router";
import {TransactionDetailsPageComponent} from "./transaction-details-page.component";
import {TransactionDetailsBuyingTransactionResolverService} from "./transaction-details-buying-transaction-resolver.service";
/**
 * Created by Viki on 2/19/2017.
 */

export const TransactionDetailsPageRoutes: Routes = [
  {
    path: '',
    component: TransactionDetailsPageComponent,
    resolve: {
      transaction: TransactionDetailsBuyingTransactionResolverService
    }
  }
];
