/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "ideal-text-editor-toolbar",
  templateUrl: "text-editor-toolbar.component.html",
  styleUrls: ["text-editor-toolbar.component.css"]
})
export class TextEditorToolbarComponent {
  @Input("title") title:string;
}
