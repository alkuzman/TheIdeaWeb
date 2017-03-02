import {Routes} from "@angular/router";
import {TransactionPagesComponent} from "./transaction-pages.component";
import {AuthenticatedGuard} from "../../core/guards/authenticated.guard";
/**
 * Created by Viki on 2/19/2017.
 */


export const TransactionPagesRoutes: Routes = [
  {
    path: "",
    component: TransactionPagesComponent,
    children: [
      /*
       {
       path: "",
       canActivate: [AuthenticatedGuard],
       loadChildren: "app/pages/transaction-pages/transaction-details-page/transaction-details-page.module#TransactionDetailsPageModule"
       },
       */
      {
        path: "new",
        canActivate: [AuthenticatedGuard],
        loadChildren: "app/pages/transaction-pages/new-transaction-page/new-transaction-page.module#NewTransactionPageModule"
      },
      /*
       {
       path: ":id",
       canActivate: [AuthenticatedGuard],
       loadChildren: "app/pages/transaction-pages/transaction-details-page/transaction-details-page.module#TransactionDetailsPageModule"
       }
       */
    ]
  }
];
