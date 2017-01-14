import {Component, HostBinding, OnInit} from '@angular/core';
import { Config } from './shared/index';
import {ThemingService} from "./core/theming/theming.service";
import {Theme} from "./core/theming/theme";
import {Http} from "@angular/http";

/**
 * This class represents the main application components. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-app',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css'
  ]
})
export class AppComponent implements OnInit{
  @HostBinding("class") themeClass = "default-theme";

  constructor(private themingService: ThemingService) {
    console.log('Environment config', Config);
  }

  ngOnInit() {
    this.themingService.themeObservable.subscribe((theme: string) => {
      console.log(theme + " #");
      this.themeClass = theme;});
  }

}
