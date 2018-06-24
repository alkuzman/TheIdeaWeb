/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Problem} from '../../../../model/ideas';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProblemFormErrors} from './problem-form-errors';
import {ProblemValidationMessages} from './problem-validation-messages';
import {Keyword} from '../../../../model/ideas/keyword';
import {Analyzer} from '../../../../../core/analyzers/analyzer';

@Component({
  moduleId: module.id,
  selector: 'ideal-problem-fields',
  templateUrl: 'problem-fields.component.html',
  styleUrls: ['problem-fields.component.scss']
})
export class ProblemFieldsComponent implements OnInit, AfterViewChecked {
  @Input('titleLabel') titleLabel = 'Title';
  @Input('bodyLabel') bodyLabel = 'Problem Body';
  @Input('tagsLabel') tagsLabel = 'Tags';
  @Input('form') form: FormGroup;
  @Output('contentChanged') contentChanged: EventEmitter<void> = new EventEmitter<void>();
  currentForm: FormGroup;
  @Input('problem') problem: Problem;
  keywords: Keyword[];
  isContentChanged;
  formErrors: ProblemFormErrors = {
    title: '',
    text: ''
  };
  validationMessages: ProblemValidationMessages = {
    title: {
      required: 'Title is required',
    },
    text: {
      required: 'Body is required',
      minlength: 'Body should be at least 100 characters long'
    }
  };
  public options: Object = {
    placeholderText: 'Problem Body'
  };

  _submitted: boolean;

  constructor(private fb: FormBuilder, private analyzer: Analyzer) {
  }

  @Input('submitted') set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.problem.title, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.problem.title = value;
      this.onContentChanged();
    });
    this.form.addControl('title', control);

    control = this.fb.control(this.problem.text);
    control.valueChanges.subscribe((value: string) => {
      this.problem.text = value;
      this.onContentChanged();
    });
    this.form.addControl('text', control);

    control = this.fb.control(this.problem.keywords);
    control.valueChanges.subscribe((value: string[]) => {
      this.problem.keywords = value;
    });
    this.form.addControl('keywords', control);
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

  onContentChanged(): void {
    this.isContentChanged = true;
    this.contentChanged.emit();
  }

  getKeywords(): void {
    if (this.isContentChanged) {
      this.isContentChanged = false;
      this.keywords = null;
      this.analyzer.getProblemKeywords(this.problem).subscribe((keywords: Keyword[]) => {
        this.keywords = keywords;
      });
    }
  }
}
