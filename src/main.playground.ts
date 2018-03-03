/**
 * Created by AKuzmanoski on 23/02/2018.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializePlayground, PlaygroundModule } from 'angular-playground';

initializePlayground('ideal-app');
platformBrowserDynamic().bootstrapModule(PlaygroundModule);
