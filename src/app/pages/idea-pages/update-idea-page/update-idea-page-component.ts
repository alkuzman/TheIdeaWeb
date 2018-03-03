/**
 * Created by VikiPeeva on 01/07/2018.
 */
import {Component, OnInit} from "@angular/core";
import {Solution} from "../../../domain/model/ideas/solution";
import {MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FormPage} from "../../../core/helper/form-page";
import {SecurityPasswordDialogComponent} from "../../../domain/security/components/security-password-dialog/security-password-dialog.component";
import {DecryptingService} from "../../../core/security-protocols/decrypting.service";

@Component({
  moduleId: module.id,
  selector: "ideal-update-idea-page",
  templateUrl: "update-idea-page.component.html"
})
export class UpdateIdeaPageComponent implements OnInit, FormPage {
  solution: Solution;
  dirty: boolean;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private decryptingService: DecryptingService) {
    this.solution = new Solution();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { solution: Solution }) => {
      this.solution = data.solution;
      console.log(data.solution);

      const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
      dialogRef.afterClosed().subscribe((password: string) => {

        this.decryptingService.decryptSolution(data.solution.text.slice(3, data.solution.text.length - 4), password)
          .subscribe((decryptedSolutionText: string) => {
            console.log(decryptedSolutionText);
            data.solution.text = decryptedSolutionText;
            this.solution = data.solution;

          });
      });

    });
  }

  onSolutionReady(solution: Solution) {
    this.snackBar.open("Idea successfully created!", undefined, <MatSnackBarConfig>{duration: 2000});
    this.router.navigate(["/ideas", solution.idea.id]);
  }

  onDirtyChanges(dirty: boolean) {
    this.dirty = dirty;
  }

  isDirty(): boolean {
    return this.dirty;
  }
}
