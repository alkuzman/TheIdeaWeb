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
  @Input("idea") idea: Idea;
  @Input("problem") problem: Problem;
  solution: Solution;
  errorMessage: any;

  constructor(private solutionService: SolutionService, private jwtSecurityContext: JwtSecurityContext) {

  }

  ngOnInit(): void {
    this.solution = new Solution();
    if (this.idea != null)
      this.solution.idea = this.idea;
    else this.solution.idea = new Idea();
    if (this.problem != null)
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
