import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdAutocompleteModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdSliderModule, MdSlideToggleModule,
MdMenuModule, MdSidenavModule, MdToolbarModule, MdListModule, MdGridListModule, MdCardModule, MdTabsModule,
MdButtonModule, MdChipsModule, MdIconModule, MdProgressSpinnerModule, MdProgressBarModule, MdDialogModule,
MdTooltipModule, MdSnackBarModule} from "@angular/material";

@NgModule({
  exports: [
    MdInputModule, MdAutocompleteModule, MdCheckboxModule, MdSelectModule, MdSliderModule, MdSlideToggleModule,
    MdMenuModule, MdSidenavModule, MdToolbarModule, MdListModule, MdGridListModule, MdCardModule, MdTabsModule,
    MdButtonModule, MdChipsModule, MdIconModule, MdProgressSpinnerModule, MdProgressBarModule, MdDialogModule,
    MdTooltipModule, MdSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
