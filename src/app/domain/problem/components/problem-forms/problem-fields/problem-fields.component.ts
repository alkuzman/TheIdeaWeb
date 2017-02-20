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
  @Input("idleDelay") idleDelay: number = 1500;
  @Output("idle") idle: EventEmitter<number> = new EventEmitter<number>();
  private currentForm: FormGroup;
  @Input("problem") problem: Problem;
  private _submitted: boolean;
  private problemAnalysis: ProblemAnalysis;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder, private analyzerService: AnalyzerService) {
  }

  ngOnInit(): void {
    this.problem.keywords = [];
    let control: FormControl = this.fb.control(this.problem.title, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.problem.title = value;
    });
    this.form.addControl("title", control);

    control = this.fb.control(this.problem.text);
    control.valueChanges.subscribe((value: string) => {
      this.problem.text = value;
    });
    this.form.addControl("text", control);

    control = this.fb.control("");
    control.valueChanges.subscribe((value: string) => {
      // Tags not implemented yet
      // TODO update tags here
    });
    this.form.addControl("tags", control);
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
      if (control && (control.dirty || this._submitted) && !control.valid) {
        const messages: ValidationMessagesErrors = this.validationMessages[field];
        for (const key in control.errors) {

          this.formErrors[field] += messages[key] + ' ';
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

  onIdle(value: number) {
    this.analyzerService.analyzeProblem(this.problem).subscribe((problemAnalysis: ProblemAnalysis) => {
      this.problemAnalysis = problemAnalysis;
      console.log("Problem analysis ready");
    });
    this.idle.emit(value);
  }
}
