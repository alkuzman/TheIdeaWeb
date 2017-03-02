import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NoticeFeedPageRoutes} from "./notice-feed-page.routes";
/**
 * Created by Viki on 3/2/2017.
 */


@NgModule({
  imports: [RouterModule.forChild(NoticeFeedPageRoutes)],
  exports: [RouterModule]
})
export class NoticeFeedPageRoutingModule {}
