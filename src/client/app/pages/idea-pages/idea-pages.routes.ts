import {Routes} from "@angular/router";
import {IdeaPagesComponent} from "./idea-pages.component";
import {LoggedInGuard} from "../../core/guards/logged-in.guard";
/**
 * Created by AKuzmanoski on 25/10/2016.
 */
export const IdeaPagesRoutes: Routes = [
  {
    path: "",
    component: IdeaPagesComponent,
    loadChildren: "app/pages/idea-pages/ideas-page/ideas-page.module#IdeasPageModule"
  },
  {
    path: "new",
    component: IdeaPagesComponent,
    canActivate: [LoggedInGuard],
    loadChildren: "app/pages/idea-pages/new-idea-page/new-idea-page.module#NewIdeaPageModule"
  },
  {
    path: ":id",
    component: IdeaPagesComponent,
    loadChildren: "app/pages/idea-pages/idea-details-page/idea-details-page.module#IdeaDetailsPageModule"
  }
]
