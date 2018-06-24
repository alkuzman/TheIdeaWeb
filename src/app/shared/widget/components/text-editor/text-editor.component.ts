/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractValueAccessor, MakeProvider} from '../../../abstract-value-accessor';

@Component({
  moduleId: module.id,
  selector: 'ideal-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.scss'],
  providers: [MakeProvider(TextEditorComponent)]
})
export class TextEditorComponent extends AbstractValueAccessor<string> implements OnInit {
  @Input('title') title = 'Body';
  @Output('blur') blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output('input') input: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {
    super('');
  }

  ngOnInit(): void {

  }

  getNumberOfCharacters(): number {
    return this.value.length;
  }

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
  }

  onInput(value: Event): void {
    this.input.emit(value);
  }
}
