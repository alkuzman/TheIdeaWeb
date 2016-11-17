/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component} from "@angular/core";
import {UserService} from "../core/user/user.service";
import {Router} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.css'],
})
export class PagesComponent {
  query: string = "";
  searchState: boolean = false;

  constructor(private userService: UserService, private router: Router) {
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
