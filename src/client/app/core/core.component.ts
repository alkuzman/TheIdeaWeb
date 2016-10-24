import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ideal-main-nav',
    templateUrl: 'core.component.html',
    styleUrls: ['core.component.css'],
})
export class CoreComponent {
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
