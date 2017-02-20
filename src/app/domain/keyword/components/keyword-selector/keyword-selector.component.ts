/**
 * Created by AKuzmanoski on 20/02/2017.
 */
import {Component, Input} from "@angular/core";
import {Keyword} from "../../../model/ideas/keyword";
@Component({
  moduleId: module.id,
  selector: "ideal-keyword-selector",
  templateUrl: "keyword-selector.component.html"
})
export class KeywordSelectorComponent {
  @Input("searchPlaceholder") searchPlaceholder: string = "Search";
  @Input("suggestedKeywords") suggestedKeywords: Keyword[];
  @Input("keywords") keywords: string[];

  onKeywordSelected(keyword: string) {
    this.keywords.push(keyword);
  }

  remove(keyword: string, index: number) {
    this.keywords.splice(index, 1);
  }
}
