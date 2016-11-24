import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../problem.service";
import {JwtSecurityContext} from "../../../../shared/security/jwt/jwt-security-context.service";
import {User} from "../../../model/authentication/user";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-new-problem-form',
  templateUrl: 'new-problem-form.component.html',
  styleUrls: ['new-problem-form.component.css'],
})
export class NewProblemFormComponent implements OnInit {
  @Input("submitText") submitText: string = "Save";
  problem: Problem;
  @Output("problemReady") problemReady: EventEmitter<Problem> = new EventEmitter<Problem>();
  active = true;
  errorMessage: any;

  constructor(private problemService: ProblemService, private securityContext: JwtSecurityContext) {

  }

  ngOnInit(): void {
      this.problem = new Problem();
  }

  save(p: Problem): boolean {
    this.problem = p;
    let questioner: User = this.securityContext.principal;
    this.problem.questioner = questioner;
    this.problemService.addProblem(this.problem)
      .then(
        problem => this.problemCreated(problem),
        error => this.errorMessage = <any>error
      );
    return true;
  }

  problemCreated(problem: Problem): void {
    this.problem = problem;
    this.problemReady.emit(this.problem);
  }
}
