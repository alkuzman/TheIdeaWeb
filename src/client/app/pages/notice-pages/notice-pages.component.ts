import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
/**
 * Created by Viki on 1/24/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-notice-pages",
  template: `<router-outlet></router-outlet>`
})
export class NoticePagesComponent implements OnInit{
  constructor(private themingService: ThemingService) {

  }

  ngOnInit(): void {
    this.themingService.currentTheme = "default-theme";
  }
}
