import {Keyword} from "../model/ideas/keyword";
/**
 * Created by AKuzmanoski on 14/03/2017.
 */
export class KeywordSelectionWrapper {
  public keyword: Keyword;
  public selected: boolean;

  constructor(keyword: Keyword, selected: boolean) {
    this.keyword = keyword;
    this.selected = selected;
  }
}
