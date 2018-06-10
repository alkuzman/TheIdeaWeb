import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DiscardChangesDialogComponent} from '../../shared/widget/components/discard-changes/discard-changes-dialog.component';
import {FormPage} from '../helper/form-page';

/**
 * Created by AKuzmanoski on 27/02/2017.
 */
@Injectable()
export class DiscardChangesGuard implements CanDeactivate<FormPage> {

  constructor(public dialog: MatDialog) {
  }

  canDeactivate(component: FormPage, route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isDirty()) {
      return this.confirm();
    }
    return true;
  }

  confirm(): Observable<boolean> {
    const dialogRef = this.dialog.open(DiscardChangesDialogComponent);
    return dialogRef.afterClosed().pipe(map((value => {
      let close = false;
      if (value) {
        close = true;
      }
      return close;
    })));
  }
}
