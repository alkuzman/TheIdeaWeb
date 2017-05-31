import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {User} from "../../../../model/authentication/user";
import {UserService} from "../../../../services/user/user.service";
import {Response} from "@angular/http";
import {Credentials} from "../../../helper/Credentials";
import {UserObjectService} from "../../../../services/user/user-object.service";
/**
 * Created by Viki on 11/1/2016.
 */

@Component({
    moduleId: module.id,
    selector: "ideal-check-user-password-form",
    templateUrl: "check-user-password-form.component.html"
})
export class CheckUserPasswordFormComponent implements OnInit {
    @Output("usernameNotChecked") usernameNotChecked: EventEmitter<void> = new EventEmitter<void>();
    @Output("passwordCorrect") passwordCorrect: EventEmitter<User> = new EventEmitter<User>();
    @Output("passwordIncorrect") passwordIncorrect: EventEmitter<void> = new EventEmitter<void>();
    @Output("userNotActivated") userNotActivated: EventEmitter<void> = new EventEmitter<void>();

    constructor(private userService: UserService, private userObjectService: UserObjectService) {
    }

    user: User;

    ngOnInit(): void {
        this.user = this.userObjectService.user;
        if (this.user == null) {
            this.usernameNotChecked.emit();
        }
        this.user.password = "";
    }

    checkUserPassword(credentials: Credentials) {
        this.userService.loginUser(credentials).subscribe((response: Response) => this.onPasswordCorrect(response),
            (error: Response) => this.onError(error));
    }

    onError(error: Response) {
        console.log(error.text());
        if (error.status == 401) {
            if (JSON.parse(error.text()).errorCode == 11) {
                this.notifyUserNotActivated();
            }
            else if (JSON.parse(error.text()).errorCode == 10) {
                this.notifyPasswordWrong();
            }
        }
    }

  onPasswordCorrect(response: Response) {
    this.notifyPasswordCorrect()
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

