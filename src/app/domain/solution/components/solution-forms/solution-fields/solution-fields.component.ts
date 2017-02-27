/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {SolutionFormErrors} from "./solution-form-errors";
import {SolutionValidationMessages} from "./solution-validation-messages";
import {IdeaAnalysis} from "../../../../model/analyzers/analysis/idea-analysis";
import {AnalyzerService} from "../../../../../core/analyzers/analyzer.service";
import {SolutionQuality} from "../../../../model/analyzers/analysis/solution-quality";
import {SolutionQualityStatus} from "../../../../model/analyzers/analysis/solution-quality-status";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-fields",
  templateUrl: "solution-fields.component.html",
})
export class SolutionFieldsComponent {
  @Input("bodyLabel") bodyLabel: string = "Solution Body";
  @Input("problemTitleLabel") problemTitleLabel: string = "Problem Title";
  @Input("ideaTitleLabel") ideaTitleLabel: string = "Idea Title";
  @Input("problemBodyLabel") problemBodyLabel: string = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel: string = "Problem Tags";
  @Input("ideaSnackPeakLabel") ideaSnackPeakLabel: string = "Snack Peak";
  @Input("tagsLabel") tagsLabel = "Solution Tags Label";
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Input("form") form: FormGroup;
  @Input("idleDelay") idleDelay: number = 1500;
  @Output("idle") idle: EventEmitter<number> = new EventEmitter<number>();
  private currentForm: FormGroup;
  @Input("solution") solution: Solution;
  private _submitted: boolean;
  private ideaFields: FormGroup;
  private ideaAnalysis: IdeaAnalysis;
  private numberOfTags = 5;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder, private analyzerService: AnalyzerService) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.solution.text);
    control.valueChanges.subscribe((value: string) => {
      this.solution.text = value;
    });
    this.form.addControl("text", control);

    this.ideaFields = this.fb.group({});
    this.form.addControl("ideaFields", this.ideaFields);
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

  onInputIdle(value: number) {
    this.idle.emit(value);
    this.analyze();
  }

  analyze() {
    this.analyzerService.analyzeIdea(this.solution).subscribe((ideaAnalysis: IdeaAnalysis) => {
      this.ideaAnalysis = ideaAnalysis;
      console.log(ideaAnalysis);
      this.numberOfTags = 5;
    });
  }

  showMoreTags() {
    this.numberOfTags += 5;
  }
}
