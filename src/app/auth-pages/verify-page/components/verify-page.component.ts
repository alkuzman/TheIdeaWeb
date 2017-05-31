import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserObjectService} from "../../../domain/services/user/user-object.service";
import {User} from "../../../domain/model/authentication/user";
import {UserService} from "../../../domain/services/user/user.service";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'ideal-verify-page',
    templateUrl: './verify-page.component.html',
    styleUrls: ['./verify-page.component.scss']
})
export class VerifyPageComponent implements OnInit {

    user: User;

    constructor(private route: ActivatedRoute, private userService: UserService,
                private snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: {user: User}) => {
            this.user = data.user;
        });
    }

    resendActivationCode(): void {
        this.userService.resendActivationCode(this.user.email).subscribe(() => {
            this.snackBar.open("Your activation code was resent", undefined, {duration: 3000});
        });
    }

}
