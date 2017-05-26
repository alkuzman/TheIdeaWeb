import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Problem} from "../../../../model/ideas/problem";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-problem-form',
  templateUrl: 'problem-form.component.html',
  styleUrls: ['problem-form.component.scss'],
})
export class ProblemFormComponent implements OnInit {
  @Input("submitText") submitText = "Submit";
  @Input("problem") problem: Problem;
  @Output("problemReady") problemReady: EventEmitter<Problem> = new EventEmitter<Problem>();
  errorMessage: any;
  form: FormGroup;
  fields: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    if (this.problem == null) {
      this.problem = new Problem();
    }
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  save(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.problemReady.emit(this.problem);
    } else {
      this.snackBar.open("Cannot save problem. Validation errors", undefined, <MdSnackBarConfig>{duration: 3000});
    }
  }

  clearForm(): void {
    this.problem = new Problem();
    this.form.reset();
  }
}
