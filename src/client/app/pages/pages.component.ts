/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {UserService} from "../domain/user/user.service";
import {Router} from "@angular/router";
import {JwtSecurityContext} from "../core/authentication/jwt/jwt-security-context.service";
import {NavigationService} from "../core/navigation/navigation.service";
import {NavigationItem} from "../core/navigation/navigation-item";
import {Title} from "@angular/platform-browser";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.css'],
})
export class PagesComponent implements OnInit{
  query: string = "";
  searchState: boolean = false;
  navigationItems: NavigationItem[];

  constructor(private userService: UserService, private router: Router, private navigationService: NavigationService) {
    console.log("PagesComponent")
  }

  ngOnInit(): void {
    this.navigationService.navigationItems
      .subscribe(
        (navigationItems: NavigationItem[]) => this.navigationItems = navigationItems,
        (error: any) => console.log(error));
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
