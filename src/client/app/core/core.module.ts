import {NgModule, forwardRef} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CoreComponent} from "./core.component";
import {IdeaModule} from "./idea/idea.module";
import {ProblemModule} from "./problem/problem.module";


@NgModule({
  imports: [SharedModule.forRoot(), IdeaModule, ProblemModule],
  declarations: [CoreComponent],
  exports: [CoreComponent],
  providers: []
})
export class CoreModule {
}


