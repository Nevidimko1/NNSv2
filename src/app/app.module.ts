import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
  ngDoBootstrap(app) {
    const dynamicComponentElement = document.querySelector('#mainContent');
    dynamicComponentElement.textContent = '';

    const componentElement = document.createElement('app-root');
    dynamicComponentElement.appendChild(componentElement);

    app.bootstrap(AppComponent);
  }
}
