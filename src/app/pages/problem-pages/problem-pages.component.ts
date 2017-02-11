import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-problem-pages',
  template: `<router-outlet></router-outlet>`
})
export class ProblemPagesComponent implements OnInit {
  constructor(private themingService: ThemingService) {

  }

  ngOnInit() {
    this.themingService.currentTheme = "problem-theme";
  }
}
