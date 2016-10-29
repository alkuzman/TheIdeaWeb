import {NgModule} from "@angular/core";
import {WidgetAvatarComponent} from "./components/avatar/widget-avatar.component";
import {MaterialModule} from "@angular/material";
import {WidgetNamedAvatarComponent} from "./components/named-avatar/widget-named-avatar.component";
import {CommonModule} from "@angular/common";
import {WidgetLabeledInput} from "./components/labeled-input/widget-labeled-input.component";
import {StringValueAccessorDirective} from "./directives/string-value-accessor.directive";
import {FormsModule} from "@angular/forms";
/**
 * Created by Viki on 10/28/2016.
 */

@NgModule({
  declarations: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective],
  exports: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective],
  imports: [MaterialModule, CommonModule, FormsModule]
})
export class WidgetModule {}
