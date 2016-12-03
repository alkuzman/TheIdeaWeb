import { Component } from '@angular/core';
import { Config } from './shared/index';

/**
 * This class represents the main application components. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-app',
  templateUrl: 'app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})

export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}
