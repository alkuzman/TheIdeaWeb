/**
 * Created by AKuzmanoski on 19/10/2016.
 */

import {Component, Output, EventEmitter, OnInit, forwardRef, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextEditorComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'ideal-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.css'],
})
export class TextEditorComponent {
  @Input("title") title: string = "Body";
  @Output("textChange") textChange: EventEmitter<any>;
  //The internal data model
  private text: any = '';

  constructor() {
    this.textChange = new EventEmitter<any>();
  }


  //get accessor
  get value(): any {
    return this.text;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.text) {
      this.text = v;
    }
  }

  onChange(value: string) {
    this.textChange.emit(value);
  }
}
