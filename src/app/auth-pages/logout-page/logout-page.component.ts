/**
 * Created by AKuzmanoski on 20/12/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'ideal-logout-page',
  template: `<h1>Logout</h1>`
})
export class LogoutPageComponent implements OnInit {
  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.authenticationService.signOut();
    this.router.navigate(['']).then(data => {
    }).catch(error => {
    });
  }
}
