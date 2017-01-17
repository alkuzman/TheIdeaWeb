import {join} from "path";
import {SeedConfig} from "./seed.config";
const proxy = require('proxy-middleware');
var path = require('path');

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  private scssPaths = ['./node_modules/'];

  private importerFunction = function (url: any, prev: any, done: any) {
    if (url[0] === '~') {
      url = path.resolve('node_modules', url.substr(1));
    }

    return {file: url};
  };


  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // add reverse proxy here
    this.PLUGIN_CONFIGS['browser-sync'] = {
      port: this.PORT,
      startPath: this.APP_BASE,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        middleware: [
          proxy({
            protocol: 'http:',
            hostname: 'localhost',
            port: 8080,
            pathname: '/',
            route: '/api'
          }),
          proxy({
            protocol: 'http:',
            hostname: 'localhost',
            port: 5000,
            pathname: '/',
            route: '/processing'
          }),
          require('connect-history-api-fallback')({index: `${this.APP_BASE}index.html`})
        ],
        routes: {
          [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${this.APP_BASE}node_modules`]: 'node_modules',
          [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    };
    // this.APP_TITLE = 'Put name of your app here';

    this.PLUGIN_CONFIGS['gulp-sass'] =
      {importer: this.importerFunction, includePaths: this.scssPaths, outputStyle: 'compressed'};

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    this.APP_TITLE = "iDeal-Hub";

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,

      /* Select a pre-built Material theme */
      /*{src: '@angular/material/core/theming/prebuilt/indigo-pink.css', inject: true},*/

      /* HammerJS is required if the app uses certain Material components (eg: md-slider and md-slide-toggle) */
      //{src: 'hammerjs/hammer.min.js', inject: 'libs'},

      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

    // add Material configuration to SystemJS.
    this.addPackageBundles({
      name: '@angular/material',
      path: 'node_modules/@angular/material/bundles/material.umd.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'rxjs',
      path: 'node_modules/rxjs/Rx.js',
      packageMeta: {
        main: 'Rx.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: '@angular/flex-layout',
      path: 'node_modules/@angular/flex-layout/bundles/flex-layout.umd.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'angular2-jwt',
      path: 'node_modules/angular2-jwt/angular2-jwt.js',
      packageMeta: {
        main: 'angular2-jwt.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'angular2-infinite-scroll',
      path: 'node_modules/angular2-infinite-scroll/angular2-infinite-scroll.js',
      packageMeta: {
        main: 'angular2-infinite-scroll.js',
        defaultExtension: 'js'
      }
    });

    this.ENABLE_SCSS = true;

  }

}
