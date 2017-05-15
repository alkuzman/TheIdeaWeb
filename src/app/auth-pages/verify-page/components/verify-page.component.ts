import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserObjectService} from "../../../domain/services/user/user-object.service";
import {User} from "../../../domain/model/authentication/user";

@Component({
    selector: 'ideal-verify-page',
    templateUrl: './verify-page.component.html',
    styleUrls: ['./verify-page.component.scss']
})
export class VerifyPageComponent implements OnInit {

    private user: User;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: {user: User}) => {
            this.user = data.user;
        });
    }

}
