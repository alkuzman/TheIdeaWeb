/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Solution} from "../../../domain/model/ideas/solution";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Router, ActivatedRoute} from "@angular/router";
import {DiscardChangesGuard} from "../../../core/guards/discard_changes.guard";
import {FormPage} from "../../../core/helper/form-page";
@Component({
  moduleId: module.id,
  selector: "ideal-new-idea-page",
  templateUrl: "new-idea-page.component.html"
})
export class NewIdeaPageComponent implements OnInit, FormPage {
  private solution: Solution;
  private dirty: boolean;

  constructor(private snackBar: MdSnackBar, private router: Router, private route: ActivatedRoute) {
    this.solution = new Solution();
  }

  ngOnInit(): void {
  }

  onSolutionReady(solution: Solution) {
    this.snackBar.open("Idea successfully created!", undefined, <MdSnackBarConfig>{duration: 2000});
    this.router.navigate(["/ideas", solution.idea.id]);
  }

  onDirtyChanges(dirty: boolean) {
    this.dirty = dirty;
  }

  isDirty(): boolean {
    return this.dirty;
  }
}
