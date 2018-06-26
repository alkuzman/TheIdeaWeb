import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../../model/authentication/user';
import {UserService} from '../../../../services/user/user.service';
import {Credentials} from '../../../helper/Credentials';
import {UserObjectService} from '../../../../services/user/user-object.service';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Created by Viki on 11/1/2016.
 */

@Component({
  moduleId: module.id,
  selector: 'ideal-check-user-password-form',
  templateUrl: 'check-user-password-form.component.html'
})
export class CheckUserPasswordFormComponent implements OnInit {
  @Output('usernameNotChecked') usernameNotChecked: EventEmitter<void> = new EventEmitter<void>();
  @Output('passwordCorrect') passwordCorrect: EventEmitter<User> = new EventEmitter<User>();
  @Output('passwordIncorrect') passwordIncorrect: EventEmitter<void> = new EventEmitter<void>();
  @Output('userNotActivated') userNotActivated: EventEmitter<void> = new EventEmitter<void>();
  user: User;

  constructor(private userService: UserService, private userObjectService: UserObjectService) {
  }

  ngOnInit(): void {
    this.user = Object.assign({}, this.userObjectService.user);
    if (this.user == null) {
      this.usernameNotChecked.emit();
    }
    this.user.password = '';
  }

  checkUserPassword(credentials: Credentials) {
    this.userService.loginUser(credentials).subscribe((response: any) => this.onPasswordCorrect(response),
      (error: HttpErrorResponse) => this.onError(error));
  }

  onError(error: HttpErrorResponse) {
    if (error.status === 401) {
      if (error.error.errorCode === 11) {
        this.notifyUserNotActivated();
      } else if (error.error.errorCode === 10) {
        this.notifyPasswordWrong();
      }
    }
  }

  onPasswordCorrect(response: any) {
    this.notifyPasswordCorrect();
  }

  notifyPasswordCorrect(): void {
    this.passwordCorrect.emit(this.user);
  }

  notifyPasswordWrong(): void {
    this.passwordIncorrect.emit();
  }

  notifyUserNotActivated(): void {
    this.userNotActivated.emit();
  }
}

