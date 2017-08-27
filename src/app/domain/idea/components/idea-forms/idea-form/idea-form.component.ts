/**
 * Created by PC on 10/10/2016.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Idea} from "../../../../model/ideas/idea";
import {Problem} from "../../../../model/ideas/problem";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-form',
  templateUrl: 'idea-form.component.html',
  styleUrls: ['idea-form.component.scss'],
})
export class IdeaFormComponent implements OnInit {
  @Input("idea") public idea: Idea;
  @Output("ideaReady") ideaReady: EventEmitter<Idea> = new EventEmitter<Idea>();
  form: FormGroup;
  fields: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.idea = new Idea();
    this.idea.problem = new Problem();
    this.idea.problem.title = "One problem";
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  save(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.ideaReady.emit(this.idea);
    } else {
      this.snackBar.open("Cannot create idea. Validation errors", undefined, <MatSnackBarConfig>{duration: 3000});
    }
  }

  clearForm(): void {
    this.idea = new Idea();
    this.idea.problem = new Problem();
    this.form.reset();
  }

  analyze(): void {
  }
}
