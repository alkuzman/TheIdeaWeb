import {Injectable} from "@angular/core";
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {NewIdeaPageComponent} from "../../pages/idea-pages/new-idea-page/new-idea-page-component";
import {Observable} from "rxjs";
import {MdDialog} from "@angular/material";
import {DiscardChangesDialog} from "../../shared/widget/components/discard-changes/discard-changes-dialog.component";
import {FormPage} from "../helper/form-page";
/**
 * Created by AKuzmanoski on 27/02/2017.
 */
@Injectable()
export class DiscardChangesGuard implements CanDeactivate<FormPage> {

  constructor(public dialog: MdDialog) {}

  canDeactivate(component: FormPage, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (component.isDirty()) {
      return this.confirm();
    }
    return true;
  }

  confirm(): Observable<boolean> {
    let dialogRef = this.dialog.open(DiscardChangesDialog);
    return dialogRef.afterClosed().map((value => {
      let close: boolean = false;
      if (value) {
        close = true;
      }
      return close;
    }));
  }
}
