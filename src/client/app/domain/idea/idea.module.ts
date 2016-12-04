/**
 * Created by PC on 10/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NewIdeaComponent} from "./components/idea-forms/idea-form-new/idea-form-new.component";
import {IdeaDetailsComponent} from "./components/idea-details/idea-details.component";
import {IdeasComponent} from "./components/idea-list/idea-list.component";
import {FormsModule} from "@angular/forms";
import {IdeaFormComponent} from "./components/idea-forms/idea-form/idea-form.component";
import {IdeaService} from "./idea.service";
import {Logger} from "../../logger.service";
import {HighlightDirective} from "./directive/highlight.directive";
import {IdeaFieldsComponent} from "./components/idea-forms/idea-fields/idea-fields.component";
import {ProblemModule} from "../problem/problem.module";
import {IdeaCardComponent} from "./components/idea-card/idea-card.component";
import {IdeaDetailsLoaderComponent} from "./components/idea-details/idea-details-loader/idea-details-loader.component";
import {UserModule} from "../user/user.module";

@NgModule({
  imports: [SharedModule, ProblemModule, UserModule],
  declarations: [NewIdeaComponent, IdeaDetailsComponent, IdeasComponent, IdeaFormComponent, HighlightDirective, IdeaFieldsComponent, IdeaCardComponent, IdeaDetailsLoaderComponent],
  providers: [IdeaService, Logger],
  exports: [NewIdeaComponent, IdeaDetailsComponent, IdeasComponent, IdeaFormComponent, IdeaFieldsComponent, IdeaCardComponent, IdeaDetailsLoaderComponent],
})
export class IdeaModule {

}
