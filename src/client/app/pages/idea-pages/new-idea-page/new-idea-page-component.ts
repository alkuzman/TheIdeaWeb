/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Solution} from "../../../core/model/ideas/solution";
import {Problem} from "../../../core/model/ideas/problem";
import {Idea} from "../../../core/model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-new-idea-page",
  templateUrl: "new-idea-page.component.html"
})
export class NewIdeaPageComponent implements OnInit{
  private solution: Solution;

  constructor() {
    this.solution = new Solution();
  }

  ngOnInit(): void {
  }

  p(solution: Solution) {
    console.log(solution);
  }
}
