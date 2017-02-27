import {Component, HostBinding, OnInit} from "@angular/core";
import {ThemingService} from "./core/theming/theming.service";
import {IconRegistryService} from "./core/icon-registry/icon-registry.service";

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
export class AppComponent implements OnInit {
  @HostBinding("class") themeClass = "default-theme";

  constructor(private themingService: ThemingService, private iconRegistry: IconRegistryService) {
    console.log('Environment config');
  }

  ngOnInit() {
    this.themingService.themeObservable.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }

}
