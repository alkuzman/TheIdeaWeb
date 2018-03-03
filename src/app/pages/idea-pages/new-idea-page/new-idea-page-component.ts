/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Solution} from "../../../domain/model/ideas/solution";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FormPage} from "../../../core/helper/form-page";

@Component({
  moduleId: module.id,
  selector: "ideal-new-idea-page",
  templateUrl: "new-idea-page.component.html"
})
export class NewIdeaPageComponent implements OnInit, FormPage {
  solution: Solution;
  dirty: boolean;

  constructor(private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.solution = new Solution();
  }

  ngOnInit(): void {
  }

  onSolutionReady(solution: Solution) {
    this.snackBar.open("Idea successfully created!", undefined, <MatSnackBarConfig>{duration: 2000});
    this.dirty = false;
    this.router.navigate(["/ideas", solution.idea.id]);
  }

  onDirtyChanges(dirty: boolean) {
    this.dirty = dirty;
  }

  isDirty(): boolean {
    return this.dirty;
  }
}
