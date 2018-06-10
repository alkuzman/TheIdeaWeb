import {map, startWith} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 19/02/2017.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Keyword} from '../../../model/ideas/keyword';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  moduleId: module.id,
  selector: "ideal-keyword-search",
  templateUrl: "keyword-search.component.html"
})
export class KeywordSearchComponent implements OnInit {
  _keywords: Keyword[] = [];
  @Input() hint = "";
  form: FormGroup;
  searchField: FormControl;
  keywordResults: Observable<Keyword[]>;

  @Input("keywords")
  get keywords(): Keyword[] {
    return this._keywords;
  }
  set keywords(keywords: Keyword[]) {
    this._keywords = keywords;
    if (this.searchField) {
      this.searchField.setValue(this.searchField.value);
    }
  }

  @Input() searchPlaceholder = "Search";
  @Input() stopKeywords: string[];
  @Input() clearAfterSelect = false;
  @Output("keywordSelected") keywordSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output("inputFocused") inputFocused: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (this._keywords == null) {
      this._keywords = [];
    }
    this.searchField = this.formBuilder.control("");
    this.form = this.formBuilder.group({
      searchField: this.searchField
    });
    this.keywordResults = this.searchField.valueChanges.pipe(
      startWith(null),
      map(val => this.search(val)));
  }

  search(value: string): Keyword[] {
    if (this._keywords) {
      return this._keywords.filter((s: Keyword) => this.testKeyword(s, value));
    }
    return [];
  }

  testKeyword(keyword: Keyword, query: string): boolean {
    if (query) {
      const reg: RegExp = new RegExp(query, 'gi');
      const matchesQuery: boolean = reg.test(keyword.phrase);
      if (!matchesQuery) {
        return false;
      }
    }
    return this.stopKeywords.indexOf(keyword.phrase) === -1;
  }

  onFocus() {
    this.inputFocused.emit();
  }

  onOptionSelected() {
    const value: string = this.searchField.value;
    if (!value || value === "") {
      this.snackBar.open("Please insert keyword", undefined, <MatSnackBarConfig>{duration: 3000});
      return;
    }
    if (this.stopKeywords.indexOf(value) !== -1) {
      this.snackBar.open("Keyword already exists", undefined, <MatSnackBarConfig>{duration: 3000});
      return;
    }
    this.keywordSelected.emit(this.searchField.value);
    if (this.clearAfterSelect) {
      this.searchField.setValue("");
    }
  }
}
