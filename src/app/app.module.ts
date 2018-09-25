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
  private unitListMain: boolean;
  private unitList: boolean;
  private nns: boolean;

  constructor() {
    const location = window.location.href.match(/view\/(\d+)(\/[a-zA-Z_]+)?(\/[a-zA-Z_]+)?/);

    this.unitListMain = location && (!location[2] || location[2] === '/unit_list'),
    this.nns = this.unitListMain && location[3] === '/nns';
  }
  ngDoBootstrap(app) {
    if (!this.nns) {
      // run app only on NNS script page
      return;
    }

    const dynamicComponentElement = document.querySelector('#mainContent');
    dynamicComponentElement.textContent = '';

    const componentElement = document.createElement('app-root');
    dynamicComponentElement.appendChild(componentElement);

    app.bootstrap(AppComponent);
  }
}
