/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, Input} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../abstract-value-accessor";

@Component({
  moduleId: module.id,
  selector: 'ideal-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.css'],
  providers: [MakeProvider(TextEditorComponent)]
})
export class TextEditorComponent extends AbstractValueAccessor<string> {
  @Input("title") title: string = "Body";


  constructor() {
    super();
  }
}
