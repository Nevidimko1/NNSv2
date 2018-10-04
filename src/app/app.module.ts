import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule, Store, select } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Reducers } from './reducers';
import { AppState, globals } from './shared/appState';
import { GlobalsService } from './shared/services/globals.service';
import { HttpModule } from '@angular/http';
import { map, filter } from 'rxjs/operators';
import { UnitsTableComponent } from './modules/unitsTable/unitsTable.component';
import { UnitsListParser } from './shared/parsers/unitsList.parser';
import { UnitsListService } from './shared/services/unitsList.service';
import { UnitsTypesService } from './shared/services/unitsTypes.service';
import { UnitsTypesParser } from './shared/parsers/unitsTypes.parser';
import { IGlobalsState } from './reducers/globals.reducer';

@NgModule({
    declarations: [
        AppComponent,
        UnitsTableComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        NgbModule,
        TableModule,
        StoreModule.forRoot(Reducers)
    ],
    providers: [
        UnitsListParser,
        UnitsTypesParser,
        GlobalsService,
        UnitsListService,
        UnitsTypesService
    ],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {

    constructor(
        private store: Store<AppState>,
        private globalsService: GlobalsService
    ) {
        this.globalsService.init$().subscribe();

        this.store.pipe(
            select(globals),
            filter((state: IGlobalsState) => state.info.isUnitListPage),
            map((state: IGlobalsState) => {
                const tabs = document.querySelectorAll('.tabu li') as any as HTMLElement[];
                const nnsTab = tabs[0].cloneNode(true) as HTMLElement;
                nnsTab.querySelector('a').href += '/nns';
                nnsTab.querySelector('a').textContent = 'NNS';
                nnsTab.classList.add('nns-tab');
                nnsTab.classList.remove('sel');
                document.querySelector('.tabu').appendChild(nnsTab);

                if (state.info.isNNSPage) {
                    // remove selected tab classes
                    tabs.forEach(el => el.classList.remove('sel'));
                    // keep nns tab selected
                    nnsTab.classList.add('sel');
                }
            })
        ).subscribe().unsubscribe();
    }

    ngDoBootstrap(app) {
        this.store.pipe(
            select(globals),
            filter((state: IGlobalsState) => state.info.isNNSPage),
            map(() => {
                // add body class selector
                document.body.classList.add('nns');

                // remove footer
                const elem = document.querySelector('.metro_footer');
                elem.parentNode.removeChild(elem);

                // bootstrap app
                const rootEl = document.querySelector('#mainContent');
                rootEl.textContent = '';
                rootEl.appendChild(document.createElement('app-root'));
                app.bootstrap(AppComponent);
            })
        ).subscribe().unsubscribe();
    }
}
