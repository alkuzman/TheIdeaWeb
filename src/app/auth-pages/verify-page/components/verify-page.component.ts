import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserObjectService} from "../../../domain/services/user/user-object.service";
import {User} from "../../../domain/model/authentication/user";

@Component({
    selector: 'ideal-verify-page',
    templateUrl: './verify-page.component.html',
    styleUrls: ['./verify-page.component.css']
})
export class VerifyPageComponent implements OnInit {

    private user: User;

    constructor(private userObjectService: UserObjectService) {
    }

    ngOnInit() {
        this.user = this.userObjectService.user;
    }

}
