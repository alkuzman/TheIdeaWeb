import {NgModule, forwardRef} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CoreComponent} from "./core.component";
import {IdeaModule} from "./idea/idea.module";
import {ProblemModule} from "./problem/problem.module";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorDirective} from "./text-editor/directives/value-accessor.directive";


@NgModule({
  imports: [SharedModule.forRoot(), IdeaModule, ProblemModule],
  declarations: [CoreComponent],
  exports: [CoreComponent],
  providers: []
})
export class CoreModule {
}


