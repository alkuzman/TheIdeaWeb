/**
 * Created by Viki on 10/29/2016.
 */


import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Directive, forwardRef} from "@angular/core";
import {WidgetLabeledInput} from "../components/labeled-input/widget-labeled-input.component";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StringValueAccessorDirective),
  multi: true
};

@Directive({
  selector: 'ideal-widget-labeled-input',
  host: {'(change)': 'onChange($event)'},
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class StringValueAccessorDirective implements ControlValueAccessor {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private host: WidgetLabeledInput) {
  }

  //From ControlValueAccessor interface
  writeValue(value: string) {
    this.host.value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  //Set touched on blur
  onBlur() {
    this.onTouched();
  }
}
