import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Directive, forwardRef} from "@angular/core";
import {IdeaFieldsComponent} from "../component/idea-fields/idea-fields.component";
import {Idea} from "../../model/ideas/idea";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IdeaValueAccessorDirective),
  multi: true
};

@Directive({
  selector: 'ideal-idea-fields',
  host: {'(ideaChange)': 'onChange($event)'},
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class IdeaValueAccessorDirective implements ControlValueAccessor {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private host: IdeaFieldsComponent) {
  }

  //From ControlValueAccessor interface
  writeValue(idea: Idea) {
    this.host.value = idea
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
