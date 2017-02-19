import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NewTransactionPageRoutes} from "./new-transaction-page.routes";
import {NewTransactionIdeaResolverService} from "./new-transaction-idea-resolver.service";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [RouterModule.forChild(NewTransactionPageRoutes)],
  exports: [RouterModule],
  providers: [NewTransactionIdeaResolverService]
})
export class NewTransactionPageRoutingModule {
}
