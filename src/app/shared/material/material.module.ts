import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatGridListModule, MatCardModule, MatTabsModule,
  MatButtonModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule,
  MatTooltipModule, MatSnackBarModule, MatButtonToggleModule, MatRadioModule
} from "@angular/material";

@NgModule({
  exports: [
    MatInputModule, MatAutocompleteModule, MatCheckboxModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatGridListModule, MatCardModule, MatTabsModule,
    MatButtonModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule,
    MatTooltipModule, MatSnackBarModule, MatButtonToggleModule, MatRadioModule
  ],
  declarations: []
})
export class MaterialModule { }
