/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, DoCheck, Input, KeyValueDiffer} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SolutionFormErrors} from "./solution-form-errors";
import {SolutionValidationMessages} from "./solution-validation-messages";
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
    currentForm: FormGroup;
    ideaFields: FormGroup;
    solutionQuality: SolutionQuality;
    numberOfTags = 5;
    contentChanged: boolean = false;
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
        placeholderText: "Solution Body"
    };

    constructor(private fb: FormBuilder, private analyzerService: AnalyzerService) {
    }

    _solution: Solution;

    @Input("solution") set solution(value: Solution) {
        this._solution = value;
    }

    _submitted: boolean;

    @Input("submitted") set submitted(submitted: boolean) {
        this._submitted = submitted;
        this.onValueChanged();
    }

    ngOnInit(): void {
        let control: FormControl = this.fb.control(this._solution.text);
        this.form.addControl("text", control);


        control = this.fb.control(this._solution.idea.awards);
        this.form.addControl("awards", control);
        control.valueChanges.subscribe((value: Award<Badge<any, any>>[]) => {
            this._solution.idea.awards = value;
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

    getSolutionQuality() {
        if (this.contentChanged) {
            this.contentChanged = false;
            this.analyzerService.getSolutionQuality(this._solution).subscribe((solutionQuality: SolutionQuality) => {
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
