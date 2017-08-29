import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {WidgetModule} from "./widget/widget.module";
import {PipesModule} from "./pipes/pipes.module";
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MomentModule} from "angular2-moment";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */


@NgModule({
  imports: [],
  providers: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FroalaEditorModule, FroalaViewModule, WidgetModule, PipesModule, FlexLayoutModule, InfiniteScrollModule, MomentModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
