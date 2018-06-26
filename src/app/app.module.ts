import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app.component';
import {Logger} from './logger.service';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {PagesModule} from './pages/pages.module';
import {DomainServicesModule} from './domain/services/domain-services.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule, BrowserAnimationsModule, FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(), CoreModule, DomainServicesModule, PagesModule, AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [Logger,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
