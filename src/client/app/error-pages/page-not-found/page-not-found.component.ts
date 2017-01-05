/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
@Component({
  moduleId: module.id,
  selector: "ideal-page-not-found",
  templateUrl: "page-not-found.component.html"
})
export class PageNotFoundComponent implements OnInit{
  constructor(private themingService: ThemingService) {
  }

  ngOnInit(): void {
    this.themingService.currentTheme = "default-theme";
  }
}
