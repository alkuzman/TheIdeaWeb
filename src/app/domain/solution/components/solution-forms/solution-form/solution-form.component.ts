/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, Input, OnInit, Output, EventEmitter, AfterViewChecked} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {AnalyzerService} from "../../../../../core/analyzers/analyzer.service";
import {IdeaAnalysis} from "../../../../model/analyzers/analysis/idea-analysis";
import {Problem} from "../../../../model/ideas/problem";
import {Idea} from "../../../../model/ideas/idea";
import {Observable} from "rxjs";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-form",
  templateUrl: "solution-form.component.html"
})
export class SolutionFormComponent implements OnInit, AfterViewChecked {
  @Input("submitText") submitText = "Submit";
  @Input("solution") solution: Solution;
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  @Output("dirty") dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
  private form: FormGroup;
  private fields: FormGroup;
  private submitted: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    if (this.solution == null)
      this.solution = new Solution();
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }


  ngAfterViewChecked(): void {
    this.form.valueChanges.subscribe(value => {
      this.dirty.emit(this.form.dirty);
    });
  }

  save(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.solutionReady.emit(this.solution);
    } else {
      this.snackBar.open("Cannot create idea. Validation errors", undefined, <MdSnackBarConfig>{duration: 3000});
    }
  }

  clearForm(): void {
    let problem = this.solution.idea.problem;
    if (problem.id == null)
      problem = new Problem();
    let idea = new Idea();
    idea.problem = problem;
    this.solution = new Solution();
    this.solution.idea = idea;
    this.form.reset();
    this.dirty.emit(false);
  }
}
