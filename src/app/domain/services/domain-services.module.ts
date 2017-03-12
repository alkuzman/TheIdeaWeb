import {NgModule} from "@angular/core";
import {AnnouncementService} from "./announcement/announcement.service";
import {IdeaService} from "./idea/idea.service";
import {IdeaActionsService} from "./idea/idea-actions.service";
import {ProblemService} from "./problem/problem.service";
import {SharableService} from "./sharable/sharable.service";
import {SolutionService} from "./solution/solution.service";
import {UserService} from "./user/user.service";
import {UserObjectService} from "./user/user-object.service";
import {ProblemActionsService} from "./problem/problem-actions.service";
import {SearchableService} from "./searchable/searchable.searvice";
import {AgentService} from "./agent/agent.service";
import {NoticeService} from "./notice/notice.service";
import {CountryService} from "./localization/country.service";
import {CertificateService} from "./certificate/certificate.service";
import {MemberService} from "./member/member.service";
import {SecurityProfileService} from "./security-profile/security-profile.service";
import {CurrencyService} from "./currency/currency.service";
/**
 * Created by AKuzmanoski on 14/01/2017.
 */
@NgModule({
  providers: [AnnouncementService, IdeaService, IdeaActionsService, ProblemService, ProblemActionsService,
    SharableService, SolutionService, UserService, UserObjectService, SearchableService, AgentService,
    NoticeService, CountryService, CertificateService, MemberService, SecurityProfileService, CurrencyService]
})
export class DomainServicesModule {
}
