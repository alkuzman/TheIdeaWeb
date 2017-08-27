/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Solution} from '../../../../model/ideas';
import {Problem} from '../../../../model/ideas';
import {Idea} from '../../../../model/ideas';
import {User} from '../../../../model/authentication';
import {SolutionService} from "../../../../services/solution/solution.service";
import {UserService} from "../../../../services/user/user.service";
import {EncryptingService} from "../../../../../core/security-protocols/encrypting.service";
import {MatDialog} from "@angular/material";
import {SecurityPasswordDialogComponent} from "../../../../security/components/security-password-dialog/security-password-dialog.component";

@Component({
  moduleId: module.id,
  selector: "ideal-solution-form-new",
  templateUrl: "solution-form-new.component.html"
})
export class NewSolutionFormComponent implements OnInit {
  @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
  @Input() showIdeaFields = true;
  @Input() showProblemFields = true;
  @Output("dirty") dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
  solution: Solution;
  errorMessage: any;
  _problem: Problem;
  _idea: Idea;

  constructor(private solutionService: SolutionService, private userService: UserService,
              private encryptingService: EncryptingService, private dialog: MatDialog) {

  }

  @Input('problem')
  set problem(problem: Problem) {
    this._problem = problem;
    if (this.solution != null) {
      if (this._idea == null) {
        this.solution.idea = new Idea();
      }
      this.solution.idea.problem = this._problem;
    }
  }

  @Input("idea") set idea(idea: Idea) {
    this._idea = idea;
    if (this.solution != null) {
      if (idea == null) {
        this.solution.idea = new Idea();
        this.solution.idea.problem = this._problem;
      } else {
        this.solution.idea = idea;
      }
    }
  }

  ngOnInit(): void {
    this.solution = new Solution();
    this.solution.idea = this._idea;
    if (this.solution.idea == null) {
      this.solution.idea = new Idea();
    }
    this.solution.idea.problem = this._problem;
    if (this.solution.idea.problem == null) {
      this.solution.idea.problem = new Problem();
    }
  }

  save(solution: Solution) {
    const owner: User = this.userService.getAuthenticatedUser();
    if (solution.idea.owner == null) {
      solution.idea.owner = owner;
    }
    if (solution.idea.problem.questioner == null) {
      solution.idea.problem.questioner = owner;
    }
    const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.encryptingService.encryptSolution(solution.text, password).subscribe((encryptedSolution: string) => {
        solution.text = encryptedSolution;
        this.solutionService.addSolution(solution).subscribe(
          (newSolution: Solution) => this.onSolutionSaved(newSolution),
          (error: any) => this.errorMessage = error
        );
      });
    });
    /*
    this.solutionService.addSolution(solution).subscribe(
      (solution: Solution) => this.onSolutionSaved(solution),
      (error: any) => this.errorMessage = error
    );
    */
  }

  onSolutionSaved(solution: Solution) {
    this.solution = solution;
    this.solutionReady.emit(this.solution);
  }

  onDirtyChanges(value: boolean) {
    this.dirty.emit(value);
  }

}
