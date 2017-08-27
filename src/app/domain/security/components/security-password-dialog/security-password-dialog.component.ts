import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material";
/**
 * Created by Viki on 2/26/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-security-password-dialog",
  templateUrl: "security-password-dialog.component.html"
})
export class SecurityPasswordDialogComponent {
  public password = "";

  constructor(private dialogRef: MatDialogRef<SecurityPasswordDialogComponent>) {
  }

  public closeDialog() {
    this.dialogRef.close(this.password);
  }

}
