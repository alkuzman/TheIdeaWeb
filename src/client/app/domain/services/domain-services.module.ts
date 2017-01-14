import {NgModule} from "@angular/core";
import {AnnouncementService} from "./announcement/announcement.service";
import {IdeaService} from "./idea/idea.service";
import {IdeaActionsService} from "./idea/idea-actions.service";
import {ProblemService} from "./problem/problem.service";
import {SharableService} from "./sharable/sharable.service";
import {SolutionService} from "./solution/solution.service";
import {UserService} from "./user/user.service";
import {UserObjectService} from "./user/user-object.service";
/**
 * Created by AKuzmanoski on 14/01/2017.
 */
@NgModule({
  providers: [AnnouncementService, IdeaService, IdeaActionsService, ProblemService, SharableService, SolutionService, UserService, UserObjectService]
})
export class DomainServicesModule {

}
