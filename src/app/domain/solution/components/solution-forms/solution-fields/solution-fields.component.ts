/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, Input} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {SolutionFormErrors} from "./solution-form-errors";
import {SolutionValidationMessages} from "./solution-validation-messages";
import {IdeaAnalysis} from "../../../../model/analyzers/analysis/idea-analysis";
import {AnalyzerService} from "../../../../../core/analyzers/analyzer.service";
import {Award} from "../../../../model/awards/award";
import {Badge} from "../../../../model/awards/badges/badge";
import {SolutionQuality} from "../../../../model/analyzers/analysis/solution-quality";
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
  private currentForm: FormGroup;
  @Input("solution") solution: Solution;
  private _submitted: boolean;
  private ideaFields: FormGroup;
  private solutionQuality: SolutionQuality;
  private numberOfTags = 5;
  private contentChanged: boolean = false;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder, private analyzerService: AnalyzerService) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.solution.text);
    this.form.addControl("text", control);
    control.valueChanges.subscribe((value: string) => {
      this.solution.text = value;
    });

    control = this.fb.control(this.solution.idea.awards);
    this.form.addControl("awards", control);
    control.valueChanges.subscribe((value: Award<Badge<any, any>>[]) => {
      this.solution.idea.awards = value;
    });

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
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {

          this.formErrors[field] = key;
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

  getSolutionQuality() {
    if (this.contentChanged) {
      this.contentChanged = false;
      this.analyzerService.getSolutionQuality(this.solution).subscribe((solutionQuality: SolutionQuality) => {
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

  public options: Object = {
    placeholderText: "Solution Body"
  };
}
