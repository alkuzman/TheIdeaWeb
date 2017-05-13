/**
 * Created by AKuzmanoski on 19/02/2017.
 */
import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {Keyword} from "../../../model/ideas/keyword";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Observable} from "rxjs";
@Component({
  moduleId: module.id,
  selector: "ideal-keyword-search",
  templateUrl: "keyword-search.component.html"
})
export class KeywordSearchComponent implements OnInit {
  @Input("keywords") _keywords: Keyword[] = [];
  private form: FormGroup;
  private searchField: FormControl;
  private keywordResults: Observable<Keyword[]>;
  @Input("keywords") set keywords(keywords: Keyword[]) {
    this._keywords = keywords;
    if (this.searchField) {
      this.searchField.setValue(this.searchField.value);
    }
  }
  @Input("searchPlaceholder") searchPlaceholder: string = "Search";
  @Input("stopKeywords") stopKeywords: string[];
  @Input("clearAfterSelect") clearAfterSelect: boolean = false;
  @Output("keywordSelected") keywordSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output("inputFocused") inputFocused: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    if (this._keywords == null)
      this._keywords = [];
    this.searchField = this.formBuilder.control("");
    this.form = this.formBuilder.group({
      searchField: this.searchField
    });
    this.keywordResults = this.searchField.valueChanges
      .startWith(null)
      .map(val => this.search(val));
  }

  search(value: string): Keyword[] {
    if (this._keywords)
      return this._keywords.filter((s: Keyword) => this.testKeyword(s, value));
    return [];
  }

  testKeyword(keyword: Keyword, query: string): boolean {
    if (query) {
      let reg: RegExp = new RegExp(query, 'gi');
      let matchesQuery: boolean = reg.test(keyword.phrase);
      if (!matchesQuery)
        return false;
    }
    return this.stopKeywords.indexOf(keyword.phrase) == -1;
  }

  onFocus() {
    this.inputFocused.emit();
  }

  onOptionSelected() {
    let value: string = this.searchField.value;
    if (!value || value == "") {
      this.snackBar.open("Please insert keyword", undefined, <MdSnackBarConfig>{duration: 3000});
      return;
    }
    if (this.stopKeywords.indexOf(value) != -1) {
      this.snackBar.open("Keyword already exists", undefined, <MdSnackBarConfig>{duration: 3000});
      return;
    }
    this.keywordSelected.emit(this.searchField.value);
    if (this.clearAfterSelect) {
      this.searchField.setValue("");
    }
  }
}
