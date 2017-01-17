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
  categories: Category[] = [
    {
      "title": "New Idea",
      "description": "Share and try to sell your idea",
      "url": "/ideas/new",
      "image": {
        "src": "/assets/images/new-idea.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "New Problem",
      "description": "Share your problem, and find solutions",
      "url": "/problems/new",
      "image": {
        "src": "/assets/images/new-problem.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Ideas",
      "url": "/announcements/feed/ideas",
      "description": "Find idea",
      "image": {
        "src": "/assets/images/find-idea.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Problems",
      "description": "Find problem and try to solve that problem",
      "url": "/announcements/feed/problems",
      "image": {
        "src": "/assets/images/new-solution.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Incubation",
      "description": "Find incubators for your idea",
      "url": "",
      "image": {
        "src": "/assets/images/grow-idea.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Management",
      "description": "Save your ideas, find new ones, and make them available to you",
      "url": "",
      "image": {
        "src": "/assets/images/manage-ideas.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    }
  ];
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
