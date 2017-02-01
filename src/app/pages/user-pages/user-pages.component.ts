import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-user-pages",
  templateUrl: "user-pages.component.html"
})
export class UserPagesComponent implements OnInit {
  constructor(private themingService: ThemingService) {

  }

  ngOnInit() {
    this.themingService.currentTheme = "user-theme";
  }
}
