/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../problem.service";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list",
  templateUrl: "problem-list.component.html",
  styleUrls: ["problem-list.component.css"]
})
export class ProblemListComponent {
  @Input("problems") problems: Problem[];
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();

  onProblemSelected(problem: Problem) {
    this.problemSelected.emit(problem);
  }
}
