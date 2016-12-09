/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {UserService} from "../domain/user/user.service";
import {Router} from "@angular/router";
import {JwtSecurityContext} from "../core/authentication/jwt/jwt-security-context.service";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.css'],
})
export class PagesComponent implements OnInit{
  query: string = "";
  searchState: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    console.log("PagesComponent")
  }

  ngOnInit(): void {
  }

  search(): boolean {
    return false;
  }

  searchStateToggle(): void {
    this.searchState = !this.searchState;
  }

  openSearch() {
    this.searchState = true;
  }

  closeSearch() {
    this.searchState = false;
  }

  logout() {
    this.userService.logout();
    this.router.navigate([""]);
  }
}
