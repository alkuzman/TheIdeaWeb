import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TransactionPagesRoutes} from "./transaction-pages.routes";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [RouterModule.forChild(TransactionPagesRoutes)],
  exports: [RouterModule]
})
export class TransactionPagesRoutingModule {
}
