import {Routes} from "@angular/router";
import {NewAnnouncementPageComponent} from "./new-annoucement-page.component";
import {SharableResolverService} from "../../sharable-resolver.service";
/**
 * Created by AKuzmanoski on 02/01/2017.
 */
export const NewAnnouncementPageRoutes: Routes = [
  {
    path: "",
    component: NewAnnouncementPageComponent,
    resolve: {
      sharable: SharableResolverService
    }
  }
];
