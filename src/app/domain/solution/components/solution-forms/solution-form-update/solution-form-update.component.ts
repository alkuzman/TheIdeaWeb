/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Solution} from "../../../../model/ideas/solution";
import {Problem} from "../../../../model/ideas/problem";
import {User} from "../../../../model/authentication/user";
import {SolutionService} from "../../../../services/solution/solution.service";
import {UserService} from "../../../../services/user/user.service";
import {EncryptingService} from "../../../../../core/security-protocols/encrypting.service";
import {MatDialog} from "@angular/material";
import {SecurityPasswordDialogComponent} from "../../../../security/components/security-password-dialog/security-password-dialog.component";

@Component({
    moduleId: module.id,
    selector: "ideal-solution-form-update",
    templateUrl: "solution-form-update.component.html"
})
export class UpdateSolutionFormComponent implements OnInit {
    @Output("solutionReady") solutionReady: EventEmitter<Solution> = new EventEmitter<Solution>();
    @Input("showIdeaFields") showIdeaFields: boolean = true;
    @Input("showProblemFields") showProblemFields: boolean = true;
    @Output("dirty") dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
    _problem: Problem;
    errorMessage: any;

    constructor(private solutionService: SolutionService, private userService: UserService,
                private encryptingService: EncryptingService, private dialog: MatDialog) {

    }

    @Input("solution")solution: Solution;

    ngOnInit(): void {
    }

    save(solution: Solution) {
        const owner: User = this.userService.getAuthenticatedUser();
        if (solution.idea.owner == null)
            solution.idea.owner = owner;
        if (solution.idea.problem.questioner == null)
            solution.idea.problem.questioner = owner;
        const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {
            this.encryptingService.encryptSolution(solution.text, password).subscribe((encryptedSolution: string) => {
                solution.text = encryptedSolution;
                this.solutionService.addSolution(solution).subscribe(
                    (solution: Solution) => this.onSolutionSaved(solution),
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
