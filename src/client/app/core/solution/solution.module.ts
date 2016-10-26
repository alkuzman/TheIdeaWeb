/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {TextEditorModule} from "../text-editor/text-editor.module";
import {SolutionFieldsComponent} from "./component/solution-fields/solution-fields.component";
import {SolutionValueAccessorDirective} from "./directives/solution-value-accessor.directive";
@NgModule({
  imports: [SharedModule.forRoot(), TextEditorModule],
  declarations: [SolutionFieldsComponent, SolutionValueAccessorDirective],
  exports: [SolutionFieldsComponent, SolutionValueAccessorDirective]
})
export class SolutionModule {

}
