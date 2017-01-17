/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {NavigationService} from "../core/navigation/navigation.service";
import {NavigationItem} from "../core/navigation/navigation-item";
import {LoadingState} from "../core/loading/loading-state";
import {LoadingService} from "../core/loading/loading.service";
import {ScrollService} from "../core/scrolling/scroll-service";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.css'],
})
export class PagesComponent implements OnInit, OnDestroy {
  query: string = "";
  searchState: boolean = false;
  navigationItems: NavigationItem[];
  private loadingState: LoadingState;

  constructor(private navigationService: NavigationService, private loadingService: LoadingService, private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.loadingService.loadingStateChange.subscribe((loadingState: LoadingState) => {
      console.log(loadingState);
      this.loadingState = loadingState
    });
    this.navigationService.navigationItems
      .subscribe(
        (navigationItems: NavigationItem[]) => {
          this.navigationItems = navigationItems
        },
        (error: any) => console.log(error));
  }

  ngOnDestroy(): void {

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

  onScroll(): void {
    console.log("Ovde");
    this.scrollService.onScroll();
  }
}
