/**
 * Created by AKuzmanoski on 04/11/2016.
 */
import {Component, HostBinding} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {ThemingService} from "../../../../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-upload-image-dialog",
  templateUrl: "upload-image-dialog.component.html"
})
export class UploadImageDialogComponent {
  imageUrl: string;
  @HostBinding("class") themeClass = "default-theme";

  constructor(private dialogRef: MdDialogRef<UploadImageDialogComponent>, private themingService: ThemingService) {
    this.themeClass = this.themingService.currentTheme;
    this.themingService.themeObservable.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }

  cancel(): void {
    this.dialogRef.close()
  }

  submit(): void {
    this.dialogRef.close(this.imageUrl);
  }
}
