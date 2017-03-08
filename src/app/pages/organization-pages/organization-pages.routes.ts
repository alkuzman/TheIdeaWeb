import {Routes} from "@angular/router";
import {OrganizationPagesComponent} from "./organization-pages.component";
import {AuthenticatedGuard} from "../../core/guards/authenticated.guard";
/**
 * Created by Viki on 11/21/2016.
 */


export const OrganizationPagesRoutes: Routes = [
  {
    path: '',
    component: OrganizationPagesComponent,
    children: [
      /*{
       path: '',
       component: OrganizationPagesComponent,
       loadChildren: "app/pages/organization-pages/organizations-page/organizations-page.module#OrganizationsPageModule"
       },*/
      {
        path: 'new',
        canActivate: [AuthenticatedGuard],
        loadChildren: "app/pages/organization-pages/new-organization-page/new-organization-page.module#NewOrganizationPageModule"
      }
    ]
  }
];
