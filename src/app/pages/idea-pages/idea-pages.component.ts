/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-pages",
  templateUrl: "idea-pages.component.html"
})
export class IdeaPagesComponent implements OnInit {
  constructor(private themingService: ThemingService) {

  }

  ngOnInit() {
    this.themingService.currentTheme = "idea-theme";
  }
}
