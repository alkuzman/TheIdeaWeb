import {Routes} from "@angular/router";
import {AnnouncementPagesComponent} from "./announcement-pages.component";
/**
 * Created by AKuzmanoski on 02/01/2017.
 */
export const AnnouncementPagesRoutes: Routes = [
  {
    path: "",
    component: AnnouncementPagesComponent,
    children: [
      {
        path: "feed",
        loadChildren: "app/pages/announcement-pages/announcement-feed-page/announcement-feed-page.module#AnnouncementFeedPageModule",
        data: {
          pageSize: 10,
          animation: {
            value: 'feed',
          }
        }
      },
      {
        path: "new",
        loadChildren: "app/pages/announcement-pages/new-announcement-page/new-announcement-page.module#NewAnnouncementPageModule"
      },
      {
        path: ":id",
        loadChildren: "app/pages/announcement-pages/announcement-details-page/announcement-details-page.module#AnnouncementDetailsPageModule"
      }
    ]
  }
];
