import {Component, Input, ViewContainerRef} from "@angular/core";
import {AbstractValueAccessor, MakeProvider} from "../../../../../abstract-value-accessor";
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {UploadImageDialogComponent} from "../../files/upload-image-dialog/upload-image-dialog.component";
/**
 * Created by AKuzmanoski on 04/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-widget-avatar-chooser",
  templateUrl: "widget-avatar-chooser.component.html",
  styleUrls: ["widget-avatar-chooser.component.css"],
  providers: [MakeProvider(AvatarChooserComponent)]
})
export class AvatarChooserComponent extends AbstractValueAccessor<string> {
  @Input("radius") radius: number = 50;
  dialogRef: MdDialogRef<UploadImageDialogComponent>;

  constructor(public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef) {
    super();
  }

  onClick(): void {
    let config = new MdDialogConfig();
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
