/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Idea, Solution} from '../../../../model/ideas';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IdeaFormErrors} from './idea-form-errors';
import {IdeaValidationMessages} from './idea-validation-messages';
import {Keyword} from '../../../../model/ideas/keyword';
import {Analyzer} from '../../../../../core/analyzers/analyzer';

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-fields',
  templateUrl: 'idea-fields.component.html',
  styleUrls: ['idea-fields.component.scss'],
})
export class IdeaFieldsComponent implements OnInit, AfterViewChecked {
  @Input('sneakPeakLabel') sneakPeakLabel = 'Sneak Peak';
  @Input('titleLabel') titleLabel = 'Title';
  @Input('problemTitleLabel') problemTitleLabel = 'Problem Title';
  @Input('problemBodyLabel') problemBodyLabel = 'Problem Body';
  @Input('problemTagsLabel') problemTagsLabel = 'Problem Tags';
  @Input('showProblemFields') showProblemFields = true;
  @Input('ideaTagsLabel') ideaTagsLabel = 'Idea Tags';
  @Input('form') form: FormGroup;
  keywords: Keyword[];
  currentForm: FormGroup;
  problemFields: FormGroup;
  @Input('idea') idea: Idea;
  ideaChanged = false;
  @Output('contentChanged') contentChanged: EventEmitter<void> = new EventEmitter<void>();
  formErrors: IdeaFormErrors = {
    title: '',
    snackPeak: '',
    tags: ''
  };
  validationMessages: IdeaValidationMessages = {
    title: {
      required: 'Title is required',
    },
    snackPeak: {
      required: 'Snack peak is required',
      minlength: 'Snack peak should be at least 25 characters long'
    },
    tags: {
      required: 'Tags are required'
    }
  };

  _submitted = false;

  _text: string;

  constructor(private fb: FormBuilder, private readonly analyzer: Analyzer) {
  }

  @Input('submitted') set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  @Input('text') set text(text: string) {
    this._text = text;
    this.onIdeaChanged();
  };

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.idea.title, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.idea.title = value;
      this.onIdeaChanged();
    });
    this.form.addControl('title', control);

    control = this.fb.control(this.idea.snackPeak, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.idea.snackPeak = value;
      this.onIdeaChanged();
    });
    this.form.addControl('snackPeak', control);

    control = this.fb.control(this.idea.keywords);
    control.valueChanges.subscribe((value: string[]) => {
      this.idea.keywords = value;
    });
    this.form.addControl('keywords', control);

    this.problemFields = this.fb.group({});
    this.form.addControl('problemFields', this.problemFields);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.form) {
      return;
    }
    this.currentForm = this.form;
    if (this.currentForm) {
      this.currentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.currentForm) {
      return;
    }
    const form = this.currentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        for (const key in control.errors) {

          this.formErrors[field] = key;
        }
      }
    }
  }

  onIdeaChanged(): void {
    this.ideaChanged = true;
    this.onContentChanged();
  }

  onContentChanged(): void {
    this.contentChanged.emit();
  }

  getKeywords(): void {
    if (this.ideaChanged) {
      this.ideaChanged = false;
      this.keywords = null;
      const solution = new Solution();
      solution.idea = this.idea;
      solution.text = this._text;
      this.analyzer.getSolutionKeywords(solution).subscribe((keywords: Keyword[]) => {
        this.keywords = keywords;
      });
    }
  }
}
