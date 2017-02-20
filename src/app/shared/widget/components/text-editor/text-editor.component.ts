/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../abstract-value-accessor";
import {AnalyzerService} from "../../../../core/analyzers/analyzer.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.scss'],
  providers: [MakeProvider(TextEditorComponent)]
})
export class TextEditorComponent extends AbstractValueAccessor<string> implements OnInit {
  @Input("title") title: string = "Body";
  @Output("blur") blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output("input") input: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private analyzerService: AnalyzerService) {
    super("");
  }

  ngOnInit(): void {

  }

  getNumberOfCharacters(): number {
    return this.value.length
  }

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
  }

  onInput(value: Event): void {
    this.input.emit(value);
  }
}
