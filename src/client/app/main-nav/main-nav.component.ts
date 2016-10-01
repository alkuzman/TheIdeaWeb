import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'idea-main-nav',
    templateUrl: 'main-nav.component.html',
    styleUrls: ['main-nav.component.css'],
})
export class MainNavComponent {
    query: string = "";
    searchState: boolean = false;

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