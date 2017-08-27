/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {Problem} from "../../../../model/ideas/problem";
import {Idea} from "../../../../model/ideas/idea";

@Component({
  moduleId: module.id,
  selector: "ideal-solution-form",
  templateUrl: "solution-form.component.html"
})
export class SolutionFormComponent implements OnInit, AfterViewChecked {
  @Input("submitText") submitText = "Submit";
  @Input("solution") solution: Solution;
  @Input("showIdeaFields") showIdeaFields = true;
  @Input("showProblemFields") showProblemFields = true;
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  @Output("dirty") dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  fields: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (this.solution == null) {
      this.solution = new Solution();
    }
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
      this.snackBar.open("Cannot create idea. Validation errors", undefined, <MatSnackBarConfig>{duration: 3000});
    }
  }

  clearForm(): void {
    let problem = this.solution.idea.problem;
    if (problem && problem.id == null) {
      problem = new Problem();
    }
    const idea = new Idea();
    idea.problem = problem;
    this.solution = new Solution();
    this.solution.idea = idea;
    this.form.reset();
    this.dirty.emit(false);
  }
}
