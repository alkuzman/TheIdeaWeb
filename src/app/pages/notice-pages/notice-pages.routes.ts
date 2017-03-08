import {Routes} from "@angular/router";
import {NoticePagesComponent} from "./notice-pages.component";
/**
 * Created by Viki on 1/24/2017.
 */
export const NoticePagesRoutes: Routes = [
  {
    path: '',
    component: NoticePagesComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/pages/notice-pages/notice-feed-page/notice-feed-page.module#NoticeFeedPageModule'
      },
      {
        path: 'new',
        loadChildren: 'app/pages/notice-pages/new-notice-page/new-notice-page.module#NewNoticePageModule'
      },
    ]
  }
];
