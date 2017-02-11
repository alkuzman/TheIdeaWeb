/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Solution} from "../../../domain/model/ideas/solution";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "ideal-new-idea-page",
  templateUrl: "new-idea-page.component.html"
})
export class NewIdeaPageComponent implements OnInit {
  private solution: Solution;

  constructor(private snackBar: MdSnackBar, private router: Router, private route: ActivatedRoute) {
    this.solution = new Solution();
  }

  ngOnInit(): void {
  }

  onSolutionReady(solution: Solution) {
    this.snackBar.open("Idea successfully created!", undefined, <MdSnackBarConfig>{duration: 2000});
    this.router.navigate(["/ideas", solution.idea.id]);
  }
}
