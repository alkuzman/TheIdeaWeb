/**
 * Created by AKuzmanoski on 04/11/2016.
 */
import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
@Component({
  moduleId: module.id,
  selector: "ideal-upload-image-dialog",
  templateUrl: "upload-image-dialog.component.html"
})
export class UploadImageDialogComponent {
  imageUrl: string;

  constructor(public dialogRef: MdDialogRef<UploadImageDialogComponent>) {

  }

  cancel(): void {
    this.dialogRef.close()
  }

  submit(): void {
    this.dialogRef.close(this.imageUrl);
  }
}
