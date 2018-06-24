/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Solution} from '../../../../model/ideas';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SolutionFormErrors} from './solution-form-errors';
import {SolutionValidationMessages} from './solution-validation-messages';
import {Award} from '../../../../model/awards/award';
import {Badge} from '../../../../model/awards/badges/badge';
import {SolutionQuality} from '../../../../model/analyzers/analysis/solution-quality';
import {Analyzer} from '../../../../../core/analyzers/analyzer';

@Component({
  moduleId: module.id,
  selector: 'ideal-solution-fields',
  templateUrl: 'solution-fields.component.html',
})
export class SolutionFieldsComponent implements OnInit, AfterViewChecked {
  @Input('bodyLabel') bodyLabel = 'Solution Body';
  @Input('problemTitleLabel') problemTitleLabel = 'Problem Title';
  @Input('ideaTitleLabel') ideaTitleLabel = 'Idea Title';
  @Input('problemBodyLabel') problemBodyLabel = 'Problem Body';
  @Input('problemTagsLabel') problemTagsLabel = 'Problem Tags';
  @Input('ideaSnackPeakLabel') ideaSnackPeakLabel = 'Snack Peak';
  @Input('tagsLabel') tagsLabel = 'Solution Tags Label';
  @Input('showIdeaFields') showIdeaFields = true;
  @Input('showProblemFields') showProblemFields = true;
  @Input('form') form: FormGroup;
  currentForm: FormGroup;
  ideaFields: FormGroup;
  solutionQuality: SolutionQuality;
  numberOfTags = 5;
  contentChanged = false;
  formErrors: SolutionFormErrors = {
    title: '',
    text: ''
  };
  validationMessages: SolutionValidationMessages = {
    text: {
      required: 'Body is required',
      minlength: 'Body should be at least 100 characters long'
    }
  };
  public options: Object = {
    placeholderText: 'Solution Body'
  };

  _solution: Solution;

  _submitted: boolean;

  constructor(private fb: FormBuilder, private analyzer: Analyzer) {
  }

  @Input('solution') set solution(value: Solution) {
    this._solution = value;
  }

  @Input('submitted') set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this._solution.text);
    this.form.addControl('text', control);


    control = this.fb.control(this._solution.idea.awards);
    this.form.addControl('awards', control);
    this.form.addControl('awards', control);
    control.valueChanges.subscribe((value: Award<Badge<any, any>>[]) => {
      this._solution.idea.awards = value;
    });

    this.ideaFields = this.fb.group({});
    this.form.addControl('ideaFields', this.ideaFields);
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
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {

          this.formErrors[field] = key;
        }
      }
    }
  }

  getSolutionQuality() {
    if (this.contentChanged) {
      this.contentChanged = false;
      this.analyzer.analyzeSolution(this._solution).subscribe((solutionQuality: SolutionQuality) => {
        this.solutionQuality = solutionQuality;
        this.numberOfTags = 5;
      });
    }
  }

  showMoreTags() {
    this.numberOfTags += 5;
  }

  onContentChanged() {
    this.contentChanged = true;
  }
}
