import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Directive, forwardRef} from "@angular/core";
import {ProblemFieldsComponent} from "../component/problem-fields/problem-fields.component";
import {Problem} from "../../model/ideas/problem";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProblemValueAccessorDirective),
  multi: true
};

@Directive({
  selector: 'ideal-problem-fields',
  host: {'(textChange)': 'onChange($event)'},
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ProblemValueAccessorDirective implements ControlValueAccessor {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private host: ProblemFieldsComponent) {
  }

  //From ControlValueAccessor interface
  writeValue(problem: Problem) {
    this.host.value = problem
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
