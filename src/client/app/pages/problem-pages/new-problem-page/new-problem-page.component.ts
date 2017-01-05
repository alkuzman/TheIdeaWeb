/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component} from "@angular/core";
import {Logger} from "../../../logger.service";
import {Problem} from "../../../domain/model/ideas/problem";
import {MdSnackBar} from "@angular/material";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'ideal-new-problem-page',
  templateUrl: 'new-problem-page.component.html',
  styleUrls: ['new-problem-page.component.css'],
})
export class NewProblemPageComponent {
  submitText = "Save";


  constructor(private snackBar: MdSnackBar, private router: Router, private route: ActivatedRoute) {

  }

  problemCreated(problem: Problem) {
    this.snackBar.open("Problem successfully created!", undefined, {duration: 2000});
    this.router.navigate(["/problems", problem.id]);
  }
}
