import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
/**
 * Created by Viki on 2/26/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-security-password-dialog",
  templateUrl: "security-password-dialog.component.html"
})
export class SecurityPasswordDialogComponent {
  public password: string = "";

  constructor(private dialogRef: MdDialogRef<SecurityPasswordDialogComponent>) {
  }

  public closeDialog() {
    this.dialogRef.close(this.password);
  }

}
