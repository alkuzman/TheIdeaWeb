/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {NavigationService} from "../core/navigation/navigation.service";
import {NavigationItem} from "../core/navigation/navigation-item";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.css'],
})
export class PagesComponent implements OnInit {
  query: string = "";
  searchState: boolean = false;
  navigationItems: NavigationItem[];

  constructor(private navigationService: NavigationService) {
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
}
