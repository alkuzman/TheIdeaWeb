import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NameListService} from "./name-list/index";
import {MaterialModule} from "@angular/material";
import {WidgetModule} from "./widget/widget.module";
import {PipesModule} from "./pipes/pipes.module";
import {LoggedInGuard} from "../guards/logged-in.guard";
import {HttpWraperModule} from "./http-wrapers/http-wrapers.module";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule.forRoot(), WidgetModule, PipesModule, HttpWraperModule],
  providers: [LoggedInGuard],

  exports: [MaterialModule, CommonModule, FormsModule, RouterModule, WidgetModule, PipesModule, HttpWraperModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService]
    };
  }
}
