/**
 * Created by AKuzmanoski on 19/01/2017.
 */
import {Component, EventEmitter, Output, OnInit, Input} from "@angular/core";
import {Router} from "@angular/router";
import {NavbarState} from "./navbar-state";

@Component({
  moduleId: module.id,
  selector: "ideal-navbar",
  templateUrl: "navbar.component.html",
  styleUrls: ["navbar.component.scss"]

})
export class NavbarComponent implements OnInit {
  @Output("sideNavToggle") sideNavToggle: EventEmitter<void> = new EventEmitter<void>();
  defaultState: NavbarState = NavbarState.DEFAULT;
  searchState: NavbarState = NavbarState.SEARCH;
  @Input("numberOfNotifications") numberOfNotifications: number = 0;
  state: NavbarState = this.defaultState;
  @Output("search") search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {

  }


  ngOnInit(): void {
  }

  isSearchState(): boolean {
    return this.state == NavbarState.SEARCH;
  }

  isDefaultState(): boolean {
    return this.state == NavbarState.DEFAULT;
  }

  setSearchState(): void {
    this.state = NavbarState.SEARCH;
  }

  setDefaultState(): void {
    this.state = NavbarState.DEFAULT;
  }

  onSideNavToggle(): void {
    this.sideNavToggle.emit();
  }

  onSearchSubmit(query: string) {
    this.search.emit(query);
  }
}
