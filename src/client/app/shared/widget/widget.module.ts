import {NgModule} from "@angular/core";
import {WidgetAvatarComponent} from "./components/avatars/avatar/widget-avatar.component";
import {MaterialModule} from "@angular/material";
import {WidgetNamedAvatarComponent} from "./components/avatars/named-avatar/widget-named-avatar.component";
import {CommonModule} from "@angular/common";
import {WidgetLabeledInput} from "./components/labeled-input/widget-labeled-input.component";
import {StringValueAccessorDirective} from "./directives/string-value-accessor.directive";
import {FormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";
import {AvatarChooserComponent} from "./components/avatars/avatar-chooser/widget-avatar-chooser.component";
import {UploadImageDialogComponent} from "./components/files/upload-image-dialog/upload-image-dialog.component";
/**
 * Created by Viki on 10/28/2016.
 */

@NgModule({
  declarations: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective, AvatarChooserComponent, UploadImageDialogComponent],
  exports: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective, AvatarChooserComponent, UploadImageDialogComponent],
  imports: [MaterialModule, CommonModule, FormsModule, PipesModule],
  entryComponents: [UploadImageDialogComponent]
})
export class WidgetModule {}
