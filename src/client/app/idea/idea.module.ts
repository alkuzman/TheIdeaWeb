/**
 * Created by PC on 10/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {NewIdeaComponent} from "./component/new-idea/new-idea.component";
import {IdeaComponent} from "./component/idea/idea.component";
import {IdeasComponent} from "./component/ideas/ideas.component";
import {FormsModule} from "@angular/forms";
import {IdeaFormComponent} from "./component/idea-form/idea-form.component";
import {IdeaService} from "./idea.service";
import {Logger} from "../logger.service";
import {HighlightDirective} from "./directive/highlight.directive";
import {HttpModule, JsonpModule} from "@angular/http";

@NgModule({
  imports: [SharedModule.forRoot(), FormsModule, HttpModule, JsonpModule],
  declarations: [NewIdeaComponent, IdeaComponent, IdeasComponent, IdeaFormComponent, HighlightDirective],
  providers: [IdeaService, Logger],
  exports: [NewIdeaComponent, IdeaComponent, IdeasComponent, IdeaFormComponent],
})
export class IdeaModule {
}
