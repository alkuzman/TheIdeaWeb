/**
 * Created by AKuzmanoski on 13/05/2017.
 */
import {Component, HostBinding, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {ThemingService} from "../../../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-discard-changes-dialog",
  templateUrl: "discard-changes-dialog.component.html"
})
export class DiscardChangesDialog {
  @HostBinding("class") themeClass = "default-theme";

  constructor(private dialogRef: MdDialogRef<DiscardChangesDialog>, private themingService: ThemingService) {
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
