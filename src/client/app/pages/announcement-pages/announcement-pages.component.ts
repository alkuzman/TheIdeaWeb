/**
 * Created by AKuzmanoski on 02/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-pages",
  template: `<router-outlet></router-outlet>`
})
export class AnnouncementPagesComponent implements OnInit {
  constructor(private themingService: ThemingService) {

  }

  ngOnInit(): void {
    this.themingService.currentTheme = "default-theme";
  }
}
