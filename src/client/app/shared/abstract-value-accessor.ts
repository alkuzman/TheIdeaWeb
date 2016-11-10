/**
 * Created by AKuzmanoski on 04/11/2016.
 */
import {forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  defaultValue: T;
  _value: T;
  get value(): T {
    return this._value;
  };


  constructor(value?: T) {
    this.defaultValue = value;
  }

  set value(v: T) {
    if (v !== this._value) {
      this._value = v;
      this.notify();
    }
  }

  writeValue(value: T) {
    if (value == null)
      this._value = this.defaultValue;
    else {
      this._value = value;
    }
  }

  notify(): void {
    this.onChange(this.value);
  }

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  }
}
