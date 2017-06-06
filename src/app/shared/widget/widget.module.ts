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
import {ColorDirective} from "./directives/color.directive";
import {PasswordMatcherDirective} from "./directives/password-matcher.directive";
import {FlexLayoutModule} from "@angular/flex-layout";
import {IdealInputIdle} from "./directives/input-idle.directive";
import {EmailValidatorDirective} from "./directives/email.validator.directive";
import {IdealLabel, IdealLabelModule} from "./components/label/label.component";
import {IdealBadge} from "./directives/badge.directive";
import {DiscardChangesDialog} from "./components/discard-changes/discard-changes-dialog.component";
import { DocComponent } from './components/doc/doc.component';
import { DocHeaderComponent } from './components/doc/doc-header/doc-header.component';
import { DocTitleComponent } from './components/doc/doc-header/doc-title/doc-title.component';
import { DocSubtitleComponent } from './components/doc/doc-header/doc-subtitle/doc-subtitle.component';
import { DocTextTextFigureLayoutComponent } from './components/doc/layout/doc-text-text-figure-layout/doc-text-text-figure-layout.component';
import { DocTextFigureFigureLayoutComponent } from './components/doc/layout/doc-text-figure-figure-layout/doc-text-figure-figure-layout.component';
import { DocTextFigureLayoutComponent } from './components/doc/layout/doc-text-figure-layout/doc-text-figure-layout.component';
import { TextComponent } from './components/text/text.component';
import { FigureComponent } from './components/figure/figure.component';
import { ShortTextComponent } from './components/short-text/short-text.component';
import { DocContentComponent } from './components/doc/doc-content/doc-content.component';
import { DocTableContentsComponent } from './components/doc/doc-content/doc-table-contents/doc-table-contents.component';
import { DocSectionComponent } from './components/doc/doc-content/doc-section/doc-section.component';
import {RouterModule} from "@angular/router";
import { StaggerDirective } from './directives/stagger.directive';
import { TextDirective } from './directives/text.directive';
import { ShortTextDirective } from './directives/short-text.directive';
/**
 * Created by Viki on 10/28/2016.
 */

@NgModule({
  declarations: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective, AvatarChooserComponent, UploadImageDialogComponent, TextEditorToolbarComponent, TextEditorComponent, SmoothImageWidget, ColorDirective, PasswordMatcherDirective, IdealInputIdle, EmailValidatorDirective, IdealBadge, DiscardChangesDialog, DocComponent, DocHeaderComponent, DocTitleComponent, DocSubtitleComponent, DocTextTextFigureLayoutComponent, DocTextFigureFigureLayoutComponent, DocTextFigureLayoutComponent, TextComponent, FigureComponent, ShortTextComponent, DocContentComponent, DocTableContentsComponent, DocSectionComponent, StaggerDirective, TextDirective, ShortTextDirective],
  exports: [WidgetAvatarComponent, WidgetNamedAvatarComponent, WidgetLabeledInput, StringValueAccessorDirective, AvatarChooserComponent, UploadImageDialogComponent, TextEditorComponent, SmoothImageWidget, ColorDirective, PasswordMatcherDirective, IdealInputIdle, EmailValidatorDirective, IdealLabelModule, IdealBadge, DiscardChangesDialog, DocComponent, DocHeaderComponent, DocTitleComponent, DocSubtitleComponent, DocTextTextFigureLayoutComponent, DocTextFigureFigureLayoutComponent, DocTextFigureLayoutComponent, TextComponent, FigureComponent, ShortTextComponent, DocContentComponent, DocTableContentsComponent, DocSectionComponent, StaggerDirective, TextDirective, ShortTextDirective],
  imports: [MaterialModule, CommonModule, FormsModule, PipesModule, FlexLayoutModule, RouterModule],
  entryComponents: [UploadImageDialogComponent, DiscardChangesDialog]
})
export class WidgetModule {
}
