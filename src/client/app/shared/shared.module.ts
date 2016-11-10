import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NameListService } from './name-list/index';
import {MaterialModule} from "@angular/material";
import {WidgetModule} from "./widget/widget.module";
import {PipesModule} from "./pipes/pipes.module";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule.forRoot(), WidgetModule, PipesModule],
  exports: [MaterialModule,
    CommonModule, FormsModule, RouterModule, WidgetModule, PipesModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService]
    };
  }
}
