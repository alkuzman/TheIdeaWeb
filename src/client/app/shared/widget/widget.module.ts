import {NgModule} from "@angular/core";
import {WidgetAvatarComponent} from "./components/avatar/widget-avatar.component";
import {MaterialModule} from "@angular/material";
import {WidgetNamedAvatarComponent} from "./components/named-avatar/widget-named-avatar.component";
import {CommonModule} from "@angular/common";
/**
 * Created by Viki on 10/28/2016.
 */

@NgModule({
  declarations: [WidgetAvatarComponent, WidgetNamedAvatarComponent],
  exports: [WidgetAvatarComponent, WidgetNamedAvatarComponent],
  imports: [MaterialModule, CommonModule]
})
export class WidgetModule {}
