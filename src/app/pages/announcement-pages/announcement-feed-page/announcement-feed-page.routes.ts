import {Routes} from "@angular/router";
import {AnnouncementFeedPageComponent} from "./announcement-feed-page.component";
import {AnnouncementFeedListResolverService} from "./announcement-feed-list-resolver.service";
/**
 * Created by AKuzmanoski on 08/01/2017.
 */
export const AnnouncementFeedPageRoutes: Routes = [
  {
    path: "",
    component: AnnouncementFeedPageComponent,
    resolve: {
      announcementList: AnnouncementFeedListResolverService
    }
  },
  {
    path: "ideas",
    component: AnnouncementFeedPageComponent,
    resolve: {
      announcementList: AnnouncementFeedListResolverService
    },
    data: {
      type: "Idea"
    }
  },
  {
    path: "problems",
    component: AnnouncementFeedPageComponent,
    resolve: {
      announcementList: AnnouncementFeedListResolverService
    },
    data: {
      type: "Problem"
    }
  }
];
