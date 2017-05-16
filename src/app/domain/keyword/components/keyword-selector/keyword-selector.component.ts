/**
 * Created by AKuzmanoski on 20/02/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Keyword} from "../../../model/ideas/keyword";
import {AbstractValueAccessor, MakeProvider} from "../../../../shared/abstract-value-accessor";
@Component({
  moduleId: module.id,
  selector: "ideal-keyword-selector",
  templateUrl: "keyword-selector.component.html",
  providers: [MakeProvider(KeywordSelectorComponent)]
})
export class KeywordSelectorComponent extends AbstractValueAccessor<string[]> {
  @Input("searchPlaceholder") searchPlaceholder: string = "Search";
  @Input("suggestedKeywords") suggestedKeywords: Keyword[];
  @Input("hint") hint: string = "";
  @Output("inputFocused") inputFocused: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super([]);
  }

  onKeywordSelected(keyword: string) {
    this.value.push(keyword);
    super.notify();
  }

  remove(keyword: string, index: number) {
    this.value.splice(index, 1);
    super.notify();
  }

  onInputFocused(): void {
    this.inputFocused.emit();
  }
}
