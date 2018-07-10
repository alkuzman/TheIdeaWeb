/**
 * Created by AKuzmanoski on 20/02/2017.
 */
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Keyword} from '../../../model/ideas/keyword';
import {AbstractValueAccessor, MakeProvider} from '../../../../shared/abstract-value-accessor';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar} from '@angular/material';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  moduleId: module.id,
  selector: 'ideal-keyword-selector',
  templateUrl: 'keyword-selector.component.html',
  providers: [MakeProvider(KeywordSelectorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordSelectorComponent extends AbstractValueAccessor<string[]> {
  @Input('searchPlaceholder') searchPlaceholder = 'Search';
  @Input('hint') hint = '';
  @Output('inputFocused') inputFocused: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('keywordInput') keywordInput: ElementRef;
  inputCtrl = new FormControl();
  public filteredKeywords: Keyword[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  _suggestedKeywords: Keyword[];

  constructor(private snackBar: MatSnackBar) {
    super([]);
    this.inputCtrl.valueChanges.pipe(startWith(null)).subscribe((keyword: string | null) => this.updateFilteredKeywords(keyword));
  }

  @Input('suggestedKeywords')
  get suggestedKeywords() {
    return this._suggestedKeywords;
  }

  set suggestedKeywords(keywords: Keyword[]) {
    this._suggestedKeywords = keywords;
    this.updateFilteredKeywords(this.inputCtrl.value);
  }

  onInputFocused(): void {
    this.inputFocused.emit();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add keyword
    let val = value || '';
    val = val.trim();
    if (val && val !== '') {
      if (this.value.includes(val)) {
        this.snackBar.open('Please enter non-existing keyword', undefined, {duration: 3000});
        return;
      }
      this.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.inputCtrl.setValue(null);
    super.notify();
  }

  remove(keyword: string): void {
    const index = this.value.indexOf(keyword);

    if (index >= 0) {
      this.value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.value.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.inputCtrl.setValue(null);
    super.notify();
  }

  /**
   * Update the filtered keywords from the suggested keywords and the value in the input field
   * @param {string} keyword string from the input field
   */
  private updateFilteredKeywords(keyword: string) {
    this.filteredKeywords = this.suggestedKeywords ? (this.filter(keyword, this.getUnusedKeywords())) : [];
  }

  /**
   * Filter keywords by the value given in the input field
   * @param {string} value which is used in the filter
   * @param {Keyword[]} keywords which will be filtered
   * @returns {Keyword[]} filtered keywords
   */
  private filter(value: string, keywords: Keyword[]): Keyword[] {
    let filteredKeywords = keywords;
    if (value) {
      const filterValue = value.toLowerCase();

      filteredKeywords = keywords.filter(keyword => keyword.phrase.toLowerCase().indexOf(filterValue) === 0 &&
        !this.value.includes(keyword.phrase));
    }
    return filteredKeywords;
  }

  /**
   * From the suggested keywords get only those that are new (not in the list of chips)
   * @returns {Keyword[]} new keywords
   */
  private getUnusedKeywords(): Keyword[] {
    return this.suggestedKeywords.filter(keyword => !this.value.includes(keyword.phrase));
  }
}
