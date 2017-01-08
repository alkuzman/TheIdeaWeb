/**
 * Created by PC on 10/10/2016.
 */
import {Component, EventEmitter, Output, Input, OnInit} from "@angular/core";
import {Idea} from "../../../../model/ideas/idea";
import {Problem} from "../../../../model/ideas/problem";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdSnackBar} from "@angular/material";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-form',
  templateUrl: 'idea-form.component.html',
  styleUrls: ['idea-form.component.css'],
})
export class IdeaFormComponent implements OnInit {
  @Input("idea") public idea: Idea;
  active = true;
  @Output("ideaReady") ideaReady: EventEmitter<Idea> = new EventEmitter<Idea>();
  private form: FormGroup;
  private fields: FormGroup;
  private submitted: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar) {

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
      this.snackBar.open("Cannot create idea. Validation errors", undefined, {duration: 3000});
    }
  }

  clearForm(): void {
    this.idea = new Idea();
    this.idea.problem = new Problem();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
