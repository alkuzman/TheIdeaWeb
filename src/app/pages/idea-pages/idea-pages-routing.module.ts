/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IdeaPagesRoutes} from "./idea-pages.routes";
import {IdeaResolverService} from "./idea-resolver.service";
import {SolutionResolverService} from "./solution-resolver.service";

@NgModule({
    imports: [
        RouterModule.forChild(IdeaPagesRoutes)
    ],
    providers: [
        IdeaResolverService, SolutionResolverService
    ],
    exports: [
        RouterModule
    ]
})
export class IdeaPagesRoutingModule {
}
