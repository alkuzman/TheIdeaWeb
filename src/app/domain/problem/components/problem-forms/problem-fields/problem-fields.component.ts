/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, OnInit, Input, AfterViewChecked, EventEmitter, Output} from "@angular/core";
import {Problem} from "../../../../model/ideas/problem";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {ProblemFormErrors} from "./problem-form-errors";
import {ProblemValidationMessages} from "./problem-validation-messages";
import {AnalyzerService} from "../../../../../core/analyzers/analyzer.service";
import {ProblemAnalysis} from "../../../../model/analyzers/analysis/problem-analysis";
import {Keyword} from "../../../../model/ideas/keyword";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-fields",
  templateUrl: "problem-fields.component.html"
})
export class ProblemFieldsComponent implements OnInit, AfterViewChecked {
  @Input("titleLabel") titleLabel: string = "Title";
  @Input("bodyLabel") bodyLabel: string = "Problem Body";
  @Input("tagsLabel") tagsLabel: string = "Tags";
  @Input("form") form: FormGroup;
  @Output("contentChanged") contentChanged: EventEmitter<void> = new EventEmitter<void>();
  private currentForm: FormGroup;
  @Input("problem") problem: Problem;
  private _submitted: boolean;
  private keywords: Keyword[];
  private isContentChanged;
  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder, private analyzerService: AnalyzerService) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.problem.title, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.problem.title = value;
      this.onContentChanged();
    });
    this.form.addControl("title", control);

    control = this.fb.control(this.problem.text);
    control.valueChanges.subscribe((value: string) => {
      this.problem.text = value;
      this.onContentChanged();
    });
    this.form.addControl("text", control);

    control = this.fb.control(this.problem.keywords);
    control.valueChanges.subscribe((value: string[]) => {
      this.problem.keywords = value;
    });
    this.form.addControl("keywords", control);
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

  private onContentChanged(): void {
    this.isContentChanged = true;
    this.contentChanged.emit();
  }

  private getKeywords(): void {
    if (this.isContentChanged) {
      this.isContentChanged = false;
      this.keywords = null;
      this.analyzerService.getProblemKeywords(this.problem).subscribe((keywords: Keyword[]) => {
        this.keywords = keywords;
      });
    }
  }
}
