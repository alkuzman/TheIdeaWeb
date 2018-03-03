import {Routes} from "@angular/router";
import {IdeaPagesComponent} from "./idea-pages.component";
import {AuthenticatedGuard} from "../../core/guards/authenticated.guard";

/**
 * Created by AKuzmanoski on 25/10/2016.
 */
export const IdeaPagesRoutes: Routes = [
    {
        path: "",
        component: IdeaPagesComponent,
        children: [
            {
                path: "",
                component: IdeaPagesComponent,
                loadChildren: "app/pages/idea-pages/ideas-page/ideas-page.module#IdeasPageModule"
            },
            {
                path: "new",
                component: IdeaPagesComponent,
                canActivate: [AuthenticatedGuard],
                loadChildren: "app/pages/idea-pages/new-idea-page/new-idea-page.module#NewIdeaPageModule"
            },
            {
                path: "update",
                component: IdeaPagesComponent,
                canActivate: [AuthenticatedGuard],
                loadChildren: "app/pages/idea-pages/update-idea-page/update-idea-page.module#UpdateIdeaPageModule"
            },
            {
                path: ":id",
                component: IdeaPagesComponent,
                loadChildren: "app/pages/idea-pages/idea-details-page/idea-details-page.module#IdeaDetailsPageModule"
            }
        ]
    }
]
