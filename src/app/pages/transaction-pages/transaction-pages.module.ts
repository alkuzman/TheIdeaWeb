import {NgModule} from "@angular/core";
import {TransactionPagesComponent} from "./transaction-pages.component";
import {SharedModule} from "../../shared/shared.module";
import {TransactionPagesRoutingModule} from "./transaction-pages-routing.module";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [SharedModule, TransactionPagesRoutingModule],
  declarations: [TransactionPagesComponent],
  exports: [TransactionPagesComponent]
})
export class TransactionPagesModule {
}
