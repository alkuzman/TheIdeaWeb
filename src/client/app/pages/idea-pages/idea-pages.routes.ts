import {Routes} from "@angular/router";
import {IdeaPagesComponent} from "./idea-pages.component";
import {LoggedInGuard} from "../../guards/logged-in.guard";
/**
 * Created by AKuzmanoski on 25/10/2016.
 */
export const IdeaPagesRoutes: Routes = [
  {
    path: "",
    component: IdeaPagesComponent,
    canActivate: [LoggedInGuard],
    loadChildren: "app/pages/idea-pages/ideas-page/ideas-page.module#IdeasPageModule"
  },
  {
    path: "new",
    component: IdeaPagesComponent,
    loadChildren: "app/pages/idea-pages/new-idea-page/new-idea-page.module#NewIdeaPageModule"
  }
]
