import { Component, OnInit } from '@angular/core';
import {ThemingService} from "../../core/theming/theming.service";
import {Category} from "./category";
import {CategoriesService} from "./categories.service";

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

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(private themingService: ThemingService, private categoryService: CategoriesService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.themingService.currentTheme = "default-theme";
    this.categoryService.categories.subscribe((categories: Category[]) => this.categories = categories);
  }
}
