import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {WidgetModule} from "./widget/widget.module";
import {PipesModule} from "./pipes/pipes.module";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {MomentModule} from "angular2-moment";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */


@NgModule({
  imports: [],
  providers: [],
  exports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, WidgetModule, PipesModule, FlexLayoutModule, InfiniteScrollModule, MomentModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {

      ngModule: SharedModule,
      providers: []
    };
  }
}
