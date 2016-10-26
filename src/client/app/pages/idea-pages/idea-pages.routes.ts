import {Routes} from "@angular/router";
import {IdeaPagesComponent} from "./idea-pages.component";
import {NewIdeaPageRoutes} from "./new-idea-page/new-idea-page.routes";
/**
 * Created by AKuzmanoski on 25/10/2016.
 */
export const IdeaPagesRoutes: Routes = [
  {
    path: "new",
    component: IdeaPagesComponent,
    loadChildren: "app/pages/idea-pages/new-idea-page/new-idea-page.module#NewIdeaPageModule"
  }
]
