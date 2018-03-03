/**
 * Created by AKuzmanoski on 13/05/2017.
 */
import {Component, HostBinding, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {ThemingService} from "../../../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-discard-changes-dialog",
  templateUrl: "discard-changes-dialog.component.html"
})
export class DiscardChangesDialogComponent {
  @HostBinding("class") themeClass = "default-theme";

  constructor(private dialogRef: MatDialogRef<DiscardChangesDialogComponent>, private themingService: ThemingService) {
    this.themeClass = this.themingService.currentTheme;
    this.themingService.themeObservable.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }

  cancel(): void {
    this.dialogRef.close(false)
  }

  submit(): void {
    this.dialogRef.close(true);
  }
}
