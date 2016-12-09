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
import {TextEditorToolbarComponent} from "./components/text-editor/toolbar/text-editor-toolbar.component";
import {TextEditorComponent} from "./components/text-editor/text-editor.component";
import {SmoothImageWidget} from "./components/images/smooth-image.widget";
/**
 * Created by Viki on 10/28/2016.
 */

@NgModule({
  declarations: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective, AvatarChooserComponent, UploadImageDialogComponent, TextEditorToolbarComponent, TextEditorComponent, SmoothImageWidget],
  exports: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective, AvatarChooserComponent, UploadImageDialogComponent, TextEditorComponent, SmoothImageWidget],
  imports: [MaterialModule, CommonModule, FormsModule, PipesModule],
  entryComponents: [UploadImageDialogComponent]
})
export class WidgetModule {}
