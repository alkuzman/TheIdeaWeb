import {Component, OnInit} from '@angular/core';
import {ThemingService} from "../../core/theming/theming.service";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private themingService: ThemingService) {

  }

  ngOnInit() {
    this.themingService.currentTheme = "default-theme";
  }
}
