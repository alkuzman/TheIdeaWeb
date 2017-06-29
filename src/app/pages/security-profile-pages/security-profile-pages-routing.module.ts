import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SecurityProfilePagesComponent} from "./security-profile-pages.component";

const routes: Routes = [
    {
        path: '',
        component: SecurityProfilePagesComponent,
        children: [
            {
                path: 'init',
                loadChildren: "app/pages/security-profile-pages/security-profile-initialization-page" +
                    "/security-profile-initialization-page.module#SecurityProfileInitializationPageModule"
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityProfilePagesRoutingModule {
}
