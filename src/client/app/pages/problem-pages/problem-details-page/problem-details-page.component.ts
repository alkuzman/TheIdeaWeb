/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-details-page",
  templateUrl: "problem-details-page.component.html"
})
export class ProblemDetailsPageComponent implements OnInit{
  problemId: number;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.problemId = + params['id'];
    });
  }
}
