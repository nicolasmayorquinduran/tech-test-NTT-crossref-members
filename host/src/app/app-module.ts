import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { API_CONFIG, AUTH_CONFIG, APP_CONFIG } from 'shared';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { apiConfig, authConfig, appConfig } from '../environments/environment';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: API_CONFIG, useValue: apiConfig },
    { provide: AUTH_CONFIG, useValue: authConfig },
    { provide: APP_CONFIG, useValue: appConfig }
  ],
  bootstrap: [App]
})
export class AppModule { }
