/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {Problem} from "../../../../model/ideas/problem";
import {Idea} from "../../../../model/ideas/idea";
import {JwtSecurityContext} from "../../../../../core/authentication/jwt/jwt-security-context.service";
import {User} from "../../../../model/authentication/user";
import {SolutionService} from "../../../../services/solution/solution.service";
@Component({
  moduleId: module.id,
  selector: "ideal-solution-form-new",
  templateUrl: "solution-form-new.component.html"
})
export class NewSolutionFormComponent implements OnInit {
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;
  _problem: Problem;
  _idea: Idea;

  @Input("idea") set idea(idea: Idea) {
    this._idea = idea;
    if (this.solution != null) {
      if (idea == null) {
        this.solution.idea = new Idea();
        this.solution.idea.problem = this._problem;
      } else this.solution.idea = idea;
    }
  }

  @Input('problem')
  set problem(problem: Problem) {
    this._problem = problem;
    if (this.solution != null) {
      if (this._idea == null)
        this.solution.idea = new Idea();
      this.solution.idea.problem = this._problem;
    }
  }

  solution: Solution;
  errorMessage: any;

  constructor(private solutionService: SolutionService, private jwtSecurityContext: JwtSecurityContext) {

  }

  ngOnInit(): void {
    this.solution = new Solution();
    this.solution.idea = this._idea;
    if (this.solution.idea == null)
      this.solution.idea = new Idea();
    this.solution.idea.problem = this._problem;
    if (this.solution.idea.problem == null)
      this.solution.idea.problem = new Problem();
  }

  save(solution: Solution) {
    let owner: User = this.jwtSecurityContext.principal;
    solution.idea.owner = owner;
    solution.idea.problem.questioner = owner;
    this.solutionService.addSolution(solution).subscribe(
      (solution: Solution) => this.onSolutionSaved(solution),
      (error: any) => this.errorMessage = error
    );

  }

  onSolutionSaved(solution: Solution) {
    this.solution = solution;
    this.solutionReady.emit(this.solution);
  }
}
