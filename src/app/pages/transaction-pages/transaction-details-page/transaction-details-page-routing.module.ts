import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TransactionDetailsPageRoutes} from "./transaction-details-page.routes";
/**
 * Created by Viki on 3/3/2017.
 */



@NgModule({
  imports: [RouterModule.forChild(TransactionDetailsPageRoutes)],
  exports: [RouterModule]
})
export class TransactionDetailsPageRoutingModule {}
