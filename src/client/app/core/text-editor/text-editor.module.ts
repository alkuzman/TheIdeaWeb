/**
 * Created by AKuzmanoski on 19/10/2016.
 */

import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {TextEditorComponent} from "./component/text-editor.component";
import {ValueAccessorDirective} from "./directives/value-accessor.directive";
import {TextEditorToolbarComponent} from "./component/toolbar/text-editor-toolbar.component";

@NgModule({
  imports: [SharedModule.forRoot()],
  declarations: [TextEditorComponent, ValueAccessorDirective, TextEditorToolbarComponent],
  exports: [TextEditorComponent, ValueAccessorDirective]
})
export class TextEditorModule {

}
