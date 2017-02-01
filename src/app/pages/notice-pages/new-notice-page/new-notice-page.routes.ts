import {Routes} from "@angular/router";
import {NewNoticePageComponent} from "./new-notice-page.component";
import {SharableResolverService} from "../../sharable-resolver.service";
/**
 * Created by AKuzmanoski on 24/01/2017.
 */
export const NewNoticePageRoutes: Routes = [
  {
    path: '',
    component: NewNoticePageComponent,
    resolve: {
      sharable: SharableResolverService
    }
  }
];
