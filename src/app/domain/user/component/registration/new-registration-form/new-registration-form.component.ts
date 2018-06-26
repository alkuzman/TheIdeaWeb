/**
 * Created by AKuzmanoski on 31/10/2016.
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../services/user/user.service';
import {User} from '../../../../model/authentication';
import {FieldError} from '../../../../../core/helper/field-error';
import {UserObjectService} from '../../../../services/user/user-object.service';

@Component({
  moduleId: module.id,
  selector: 'ideal-new-registration-form',
  templateUrl: 'new-registration-form.component.html'
})
export class NewRegistrationFormComponent implements OnInit {
  ConstraintViolationException = 'ConstraintViolationException';
  user: User;
  @Output('usernameNotChecked') usernameNotChecked: EventEmitter<void> = new EventEmitter<void>();
  @Output('registrationSuccessful') registrationSuccessful: EventEmitter<User> = new EventEmitter<User>();
  @Output('constraintViolation') constraintViolation: EventEmitter<FieldError[]> = new EventEmitter<FieldError[]>();

  constructor(private userService: UserService, private userObjectService: UserObjectService) {
    // userObjectService.notify();
  }

  ngOnInit(): void {
    this.user = this.userObjectService.user;
    if (this.user == null) {
      this.usernameNotChecked.emit();
    }
  }

  save(user: User): void {
    this.user = user;
    this.userService.addUser(this.user).subscribe(
      (u: User) => this.onUserReady(u), (error: any) => this.onError(error));
  }

  onUserReady(user: User): void {
    this.user = user;
    this.notify();
  }

  onError(error): void {
    if (error.status === 400) {
      const body = error.json();
      if (this.ConstraintViolationException === body.exception) {
        const errors: FieldError[] = body.errors;
        this.constraintViolation.emit(errors);
      }
    }
  }

  notify(): void {
    this.userObjectService.user = this.user;
    this.registrationSuccessful.emit(this.user);
  }
}
