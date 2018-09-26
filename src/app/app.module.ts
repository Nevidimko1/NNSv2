import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Reducers } from './reducers';
import { AppState } from './shared/appState';
import { GlobalsService } from './shared/services/globals.service';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        StoreModule.forRoot(Reducers)
    ],
    providers: [
        GlobalsService
    ],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {
    private unitListMain: boolean;
    private nns: boolean;

    constructor(
        private store: Store<AppState>,
        private globalsService: GlobalsService
    ) {
        const location = window.location.href.match(/view\/(\d+)(\/[a-zA-Z_]+)?(\/[a-zA-Z_]+)?/);

        this.unitListMain = location && (!location[2] || location[2] === '/unit_list');
        this.nns = this.unitListMain && location[3] === '/nns';

        if (this.unitListMain) {
            const tabs = document.querySelectorAll('.tabu li') as any as HTMLElement[];
            const nnsTab = tabs[0].cloneNode(true) as HTMLElement;
            nnsTab.querySelector('a').href += '/nns';
            nnsTab.querySelector('a').textContent = 'NNS';
            nnsTab.classList.add('nns-tab');
            nnsTab.classList.remove('sel');
            document.querySelector('.tabu').appendChild(nnsTab);

            if (this.nns) {
                // remove selected tab classes
                tabs.forEach(el => el.classList.remove('sel'));
                // keep nns tab selected
                nnsTab.classList.add('sel');
            }
        }
    }

    ngDoBootstrap(app) {
        if (!this.nns) {
            // bootstrap only on NNS script page
            return;
        }

        const rootEl = document.querySelector('#mainContent');
        rootEl.textContent = '';
        rootEl.appendChild(document.createElement('app-root'));

        app.bootstrap(AppComponent);
    }
}
