import {Routes} from "@angular/router";
import {DiscardChangesGuard} from "../../../core/guards/discard_changes.guard";
import {UpdateIdeaPageComponent} from "./update-idea-page-component";
import {SolutionResolverService} from "../solution-resolver.service";
import {IdeaResolverService} from "../idea-resolver.service";

/**
 * Created by VikiPeeva on 01/07/2018.
 */
export const UpdateIdeaPageRoutes: Routes = [
    {
        path: ":id",
        component: UpdateIdeaPageComponent,
        resolve: {
            solution: SolutionResolverService
        },
        canDeactivate: [DiscardChangesGuard]
    }
];
