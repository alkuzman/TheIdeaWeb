/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Solution} from "../../../model/ideas/solution";
import {SolutionService} from "../../solution.service";
@Component({
  moduleId: module.id,
  selector: "ideal-new-solution-form",
  templateUrl: "new-solution-form.component.html"
})
export class NewSolutionFormComponent implements OnInit {
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  solution: Solution;
  errorMessage: any;

  constructor(private solutionService: SolutionService) {

  }

  ngOnInit(): void {
    this.solution = new Solution();
  }

  save(solution: Solution) {
    this.solutionService.addSolution(solution).then(
      solution => this.onSolutionSaved(solution),
      error => this.errorMessage = error
    );

  }

  onSolutionSaved(solution: Solution) {
    this.solution = solution;
    this.solutionReady.emit(this.solution);
  }
}
