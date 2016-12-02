/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {Solution} from "../../../model/ideas/solution";
import {SolutionService} from "../../solution.service";
import {JwtSecurityContext} from "../../../../shared/security/jwt/jwt-security-context.service";
import {User} from "../../../model/authentication/user";
import {Problem} from "../../../model/ideas/problem";
import {Idea} from "../../../model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-new-solution-form",
  templateUrl: "new-solution-form.component.html"
})
export class NewSolutionFormComponent implements OnInit {
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  @Input("showIdeaFields") showIdeaFields: boolean = true;
  @Input("showProblemFields") showProblemFields: boolean = true;
  _problem: Problem;
  _idea: Idea;
  get idea(): Idea {
    return this._idea;
  }

  get problem(): Problem {
    return this._problem
  }

  @Input("idea") set idea(idea: Idea) {
    this._idea = idea;
    if (this.solution != null) {
      if (idea == null) {
        this.solution.idea = new Idea();
        this.solution.idea.problem = this.problem;
      } else this.solution.idea = idea;
    }
  }

  @Input("problem") set problem(problem: Problem) {
    this._problem = problem;
    if (this.solution != null) {
      if (this.idea == null)
        this.solution.idea = new Idea();
      this.solution.idea.problem = this.problem;
    }
  }
  solution: Solution;
  errorMessage: any;

  constructor(private solutionService: SolutionService, private jwtSecurityContext: JwtSecurityContext) {

  }

  ngOnInit(): void {
    this.solution = new Solution();
    this.solution.idea = this.idea;
    if (this.solution.idea == null)
      this.solution.idea = new Idea();
    this.solution.idea.problem = this.problem;
  }

  save(solution: Solution) {
    let owner: User = this.jwtSecurityContext.principal;
    solution.idea.owner = owner;
    solution.idea.problem.questioner = owner;
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
