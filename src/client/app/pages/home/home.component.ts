import { Component, OnInit } from '@angular/core';
import {ThemingService} from "../../core/theming/theming.service";
import {Category} from "./category";
import {CategoriesService} from "./categories.service";
import {ActivatedRoute} from "@angular/router";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {
  errorMessage: string;
  categories: Category[];
  numOfColumns: number = 4;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(private themingService: ThemingService, private route: ActivatedRoute) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.themingService.currentTheme = "default-theme";
    this.route.data.subscribe((data: {categories: Category[]}) => this.categories = data.categories);
    this.changeColumns(window.innerWidth);
  }

  onResize(event: any) {

    let width = event.target.innerWidth;
    this.changeColumns(width);
  }

  changeColumns(width: number) {
    if (width >= 992)
      this.numOfColumns = 4;
    if (width < 992)
      this.numOfColumns = 3;
    if (width < 768)
      this.numOfColumns = 2;
    if (width < 420)
      this.numOfColumns = 1;
  }
}
