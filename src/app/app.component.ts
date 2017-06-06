/**
 * Created by AKuzmanoski on 09/03/2017.
 */
import {Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";
import {ThemingService} from "./core/theming/theming.service";
import {IconRegistryService} from "./core/icon-registry/icon-registry.service";
import {animateChild, group, query, transition, trigger, useAnimation} from "@angular/animations";
import {slideFromLeft, slideFromRight, slideToLeft, slideToRight} from "./core/animations/slide-animations";
import {NavigationEnd, Route, Router} from "@angular/router";

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
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @HostBinding("class") themeClass = "default-theme";

  constructor(private themingService: ThemingService, private router: Router) {
    console.log('Environment config');
  }

  ngOnInit() {
    this.themingService.themeObservable.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }
}
