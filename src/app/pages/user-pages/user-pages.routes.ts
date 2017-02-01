import {UserPagesComponent} from "./user-pages.component";
import {Routes} from "@angular/router";
import {AuthenticationUserDetailsPageComponent} from "./authenticated-user-details-page.component";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */
export const UserPagesRoutes: Routes = [
  {
    path: '',
    component: UserPagesComponent,
    children: [
      {
        path: 'me',
        component: AuthenticationUserDetailsPageComponent
      },
      {
        path: ':id',
        loadChildren: "app/pages/user-pages/user-details-page/user-details-page.module#UserDetailsPageModule"
      }
    ]
  }
];
