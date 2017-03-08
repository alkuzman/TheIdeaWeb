/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Idea} from "../../../../model/ideas/idea";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
import {IdeaFormErrors} from "./idea-form-errors";
import {IdeaValidationMessages} from "./idea-validation-messages";
import {IdeaAnalysis} from "../../../../model/analyzers/analysis/idea-analysis";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-fields",
  templateUrl: "idea-fields.component.html",
  styleUrls: ["idea-fields.component.scss"],
})
export class IdeaFieldsComponent implements OnInit {
  @Input("sneakPeakLabel") sneakPeakLabel: string = "Sneak Peak";
  @Input("titleLabel") titleLabel: string = "Title";
  @Input("problemTitleLabel") problemTitleLabel = "Problem Title";
  @Input("problemBodyLabel") problemBodyLabel = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel = "Problem Tags";
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Input("ideaTagsLabel") ideaTagsLabel: string = "Idea Tags";
  @Input("form") form: FormGroup;
  @Input("idleDelay") idleDelay = 1500;
  @Output("idle") idle: EventEmitter<number> = new EventEmitter<number>();
  private currentForm: FormGroup;
  private problemFields: FormGroup;
  @Input("idea") idea: Idea;
  @Input("ideaAnalysis") ideaAnalysis: IdeaAnalysis;
  private _submitted: boolean = false;

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.idea.title, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.idea.title = value;
    });
    this.form.addControl("title", control);

    control = this.fb.control(this.idea.snackPeak, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.idea.snackPeak = value;
    });
    this.form.addControl("snackPeak", control);

    control = this.fb.control(this.idea.keywords);
    control.valueChanges.subscribe((value: string[]) => {
      this.idea.keywords = value;
    });
    this.form.addControl("keywords", control);

    this.problemFields = this.fb.group({});
    this.form.addControl("problemFields", this.problemFields);
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

  onIdle(idle: number) {
    this.idle.emit(idle);
  }
}
