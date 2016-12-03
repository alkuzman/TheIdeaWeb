/**
 * Created by PC on 10/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NewIdeaComponent} from "./components/idea-forms/idea-form-new/idea-form-new.component";
import {IdeaComponent} from "./components/idea-details/idea-details.component";
import {IdeasComponent} from "./components/idea-list/idea-list.component";
import {FormsModule} from "@angular/forms";
import {IdeaFormComponent} from "./components/idea-forms/idea-form/idea-form.component";
import {IdeaService} from "./idea.service";
import {Logger} from "../../logger.service";
import {HighlightDirective} from "./directive/highlight.directive";
import {IdeaFieldsComponent} from "./components/idea-forms/idea-fields/idea-fields.component";
import {ProblemModule} from "../problem/problem.module";
import {IdeaCardComponent} from "./components/idea-card/idea-card.component";

@NgModule({
  imports: [SharedModule, ProblemModule],
  declarations: [NewIdeaComponent, IdeaComponent, IdeasComponent, IdeaFormComponent, HighlightDirective, IdeaFieldsComponent, IdeaCardComponent],
  providers: [IdeaService, Logger],
  exports: [NewIdeaComponent, IdeaComponent, IdeasComponent, IdeaFormComponent, IdeaFieldsComponent, IdeaCardComponent],
})
export class IdeaModule {

}
