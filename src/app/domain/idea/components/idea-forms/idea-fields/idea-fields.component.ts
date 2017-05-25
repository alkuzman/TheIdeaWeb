/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Idea} from "../../../../model/ideas/idea";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IdeaFormErrors} from "./idea-form-errors";
import {IdeaValidationMessages} from "./idea-validation-messages";
import {AnalyzerService} from "../../../../../core/analyzers/analyzer.service";
import {IdeaLite} from "../../../../model/analyzers/idea-lite";
import {ProblemLite} from "../../../../model/analyzers/problem-lite";
import {Keyword} from "../../../../model/ideas/keyword";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-fields",
  templateUrl: "idea-fields.component.html",
  styleUrls: ["idea-fields.component.scss"],
})
export class IdeaFieldsComponent implements OnInit, AfterViewChecked {
  @Input("sneakPeakLabel") sneakPeakLabel: string = "Sneak Peak";
  @Input("titleLabel") titleLabel: string = "Title";
  @Input("problemTitleLabel") problemTitleLabel = "Problem Title";
  @Input("problemBodyLabel") problemBodyLabel = "Problem Body";
  @Input("problemTagsLabel") problemTagsLabel = "Problem Tags";
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Input("ideaTagsLabel") ideaTagsLabel: string = "Idea Tags";
  @Input("form") form: FormGroup;
  keywords: Keyword[];
  currentForm: FormGroup;
  problemFields: FormGroup;
  @Input("idea") idea: Idea;
  _submitted: boolean = false;
  _text: string;
  ideaChanged: boolean = false;

  @Input("text") set text(text: string) {
    this._text = text;
    this.onIdeaChanged();
  };

  @Output("contentChanged") contentChanged: EventEmitter<void> = new EventEmitter<void>();

  @Input("submitted") set submitted(submitted: boolean) {
    this._submitted = submitted;
    this.onValueChanged();
  }

  constructor(private fb: FormBuilder, private analyzerService: AnalyzerService) {
  }

  ngOnInit(): void {
    let control: FormControl = this.fb.control(this.idea.title, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.idea.title = value;
      this.onIdeaChanged();
    });
    this.form.addControl("title", control);

    control = this.fb.control(this.idea.snackPeak, Validators.required);
    control.valueChanges.subscribe((value: string) => {
      this.idea.snackPeak = value;
      this.onIdeaChanged();
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
      if (control && !control.valid) {
        for (const key in control.errors) {

          this.formErrors[field] = key;
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
      let ideaLite: IdeaLite = new IdeaLite();
      ideaLite.problem = new ProblemLite(this.idea.problem);
      ideaLite.snackPeak = this.idea.snackPeak;
      ideaLite.title = this.idea.title;
      ideaLite.text = this._text;
      this.analyzerService.getIdeaKeywords(ideaLite).subscribe((keywords: Keyword[]) => {
        this.keywords = keywords;
      });
    }
  }
}
