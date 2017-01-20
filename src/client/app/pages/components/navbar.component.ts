/**
 * Created by AKuzmanoski on 19/01/2017.
 */
import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {NavbarState} from "./navbar-state";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "ideal-navbar",
  templateUrl: "navbar.component.html"

})
export class NavbarComponent {
  @Output("sideNavToggle") sideNavToggle: EventEmitter<void> = new EventEmitter<void>()
  private defaultState: NavbarState = NavbarState.DEFAULT;
  private searchState: NavbarState = NavbarState.SEARCH;
  private state: NavbarState = this.defaultState;
  @Output("search") search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {

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
