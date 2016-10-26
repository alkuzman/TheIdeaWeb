import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Directive, forwardRef} from "@angular/core";
import {SolutionFieldsComponent} from "../component/solution-fields/solution-fields.component";
import {Solution} from "../../model/ideas/solution";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SolutionValueAccessorDirective),
  multi: true
};

@Directive({
  selector: 'ideal-solution-fields',
  host: {'(solutionChange)': 'onChange($event)'},
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SolutionValueAccessorDirective implements ControlValueAccessor {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private host: SolutionFieldsComponent) {
  }

  //From ControlValueAccessor interface
  writeValue(solution: Solution) {
    this.host.value = solution;
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
