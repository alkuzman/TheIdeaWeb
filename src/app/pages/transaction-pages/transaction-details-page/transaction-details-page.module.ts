import {NgModule} from "@angular/core";
import {TransactionDetailsPageRoutingModule} from "./transaction-details-page-routing.module";
import {TransactionDetailsPageComponent} from "./transaction-detaile-page.component";
/**
 * Created by Viki on 3/3/2017.
 */


@NgModule({
  imports: [TransactionDetailsPageRoutingModule],
  declarations: [TransactionDetailsPageComponent],
  exports: [TransactionDetailsPageComponent]
})
export class TransactionDetailsPageModule {}
