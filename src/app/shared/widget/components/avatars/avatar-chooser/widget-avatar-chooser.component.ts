import {Component, Input, ViewContainerRef} from "@angular/core";
import {AbstractValueAccessor, MakeProvider} from "../../../../abstract-value-accessor";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {UploadImageDialogComponent} from "../../files/upload-image-dialog/upload-image-dialog.component";
/**
 * Created by AKuzmanoski on 04/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-widget-avatar-chooser",
  templateUrl: "widget-avatar-chooser.component.html",
  styleUrls: ["widget-avatar-chooser.component.scss"],
  providers: [MakeProvider(AvatarChooserComponent)]
})
export class AvatarChooserComponent extends AbstractValueAccessor<string> {
  @Input("radius") radius = 50;
  dialogRef: MatDialogRef<UploadImageDialogComponent>;

  constructor(public dialog: MatDialog,
              public viewContainerRef: ViewContainerRef) {
    super();
  }

  onClick(): void {
    const config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(UploadImageDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setUrl(result)
      }
    });
  }

  setUrl(url: string): void {
    this.value = url;
  }
}
