import {Routes} from "@angular/router";
import {NewTransactionPageComponent} from "./new-transaction-page.component";
import {NewTransactionIdeaResolverService} from "./new-transaction-idea-resolver.service";
/**
 * Created by Viki on 2/19/2017.
 */


export const NewTransactionPageRoutes: Routes = [
  {
    path: "",
    component: NewTransactionPageComponent,
    resolve: {
      idea: NewTransactionIdeaResolverService
    }
  }
];
