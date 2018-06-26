import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../domain/model/authentication';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {FieldError} from '../../core/helper/field-error';
import {AuthProperties} from '../auth.properties';
import {AccessFromUrlNotAllowedGuard} from '../../core/guards/access-from-url-not-allowed.guard';

/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-register-page',
  templateUrl: 'register-page.component.html'
})
export class RegisterPageComponent implements OnInit {

  email: string;
  returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar,
              private urlAccessGuard: AccessFromUrlNotAllowedGuard) {
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

  @HostBinding('style.opacity') get opacity() {
    return 1;
  }

  @HostBinding('style.width') get width() {
    return '100%';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
      this.returnUrl = params['returnUrl'];
    });
  }

  authenticate(): void {
    const queryParams: AuthProperties = {};
    if (this.email != null) {
      queryParams.email = this.email;
    }
    if (this.returnUrl != null) {
      queryParams.returnUrl = this.returnUrl;
    }
    this.router.navigate(['auth'], {queryParams: queryParams});
  }

  login(user: User): void {
    this.snackBar.open('Your registration is successful!', undefined, <MatSnackBarConfig>{duration: 3000});
    const queryParams: AuthProperties = {};
    if (this.email != null) {
      queryParams.email = this.email;
    }
    if (this.returnUrl != null) {
      queryParams.returnUrl = this.returnUrl;
    }
    this.router.navigate(['auth'], {queryParams: queryParams});
  }

  registered(user: User): void {
    this.snackBar.open('Your registration is successful!', undefined, <MatSnackBarConfig>{duration: 3000});

    const queryParams: AuthProperties = {};
    if (this.email != null) {
      queryParams.email = this.email;
    }

    this.urlAccessGuard.allow = true;
    this.router.navigate(['auth/verify'], {queryParams: queryParams});
  }

  constraintsViolated(fieldErrors: FieldError[]): void {
    let message = '';
    for (const fieldError of fieldErrors) {
      message += '[' + fieldError.field + '] ' + fieldError.message + '\n';
    }
    message = message.substring(0, message.length - 1);
    this.snackBar.open(message, 'Try Again', <MatSnackBarConfig>{duration: 3000});
  }
}
