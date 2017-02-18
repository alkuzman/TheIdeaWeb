import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {Problem} from "../../../../model/ideas/problem";
import {JwtSecurityContext} from "../../../../../core/authentication/jwt/jwt-security-context.service";
import {User} from "../../../../model/authentication/user";
import {ProblemService} from "../../../../services/problem/problem.service";
import {UserService} from "../../../../services/user/user.service";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-problem-form-new',
  templateUrl: 'problem-form-new.component.html',
  styleUrls: ['problem-form-new.component.scss'],
})
export class NewProblemFormComponent implements OnInit {
  @Input("submitText") submitText: string = "Save";
  problem: Problem;
  @Output("problemReady") problemReady: EventEmitter<Problem> = new EventEmitter<Problem>();
  active = true;
  errorMessage: any;

  constructor(private problemService: ProblemService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.problem = new Problem();
  }

  save(p: Problem): boolean {
    this.problem = p;
    let questioner: User = this.userService.getAuthenticatedUser();
    this.problem.questioner = questioner;
    this.problemService.addProblem(this.problem)
      .subscribe(
        (problem: Problem) => this.problemCreated(problem),
        (error: any) => this.errorMessage = error
      );
    return true;
  }

  problemCreated(problem: Problem): void {
    this.problem = problem;
    this.problemReady.emit(this.problem);
  }
}
