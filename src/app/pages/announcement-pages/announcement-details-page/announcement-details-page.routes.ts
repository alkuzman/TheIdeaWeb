import {Routes} from "@angular/router";
import {AnnouncementDetailsPageComponent} from "./announcement-details-page.component";
import {AnnouncementResolverService} from "./announcement-resolver.service";
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
export const AnnouncementDetailsPageRoutes: Routes = [
  {
    path: "",
    component: AnnouncementDetailsPageComponent,
    resolve: {
      announcement: AnnouncementResolverService
    }
  }
];
