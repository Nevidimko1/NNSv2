import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { IGlobalsState } from './reducers/globals.reducer';
import { ToolbarComponent } from './modules/toolbar/toolbar.component';
import { LetDirective } from './directives/ngLet.directive';
import { PriceComponent } from './modules/toolbar/partials/price/price.component';
import { SupplyComponent } from './modules/toolbar/partials/supply/supply.component';
import { ControlPanelComponent } from './modules/controlPanel/controlPanel.component';
import { ApiService } from './shared/services/api.service';
import { ForecastParser } from './shared/parsers/forecast.parser';
import { UnitSummaryParser } from './shared/parsers/unitSummary.parser';
import { RetailTradingHallParser } from './shared/parsers/retail/retailTradingHall.parser';
import { RetailProductReportParser } from './shared/parsers/retail/retailProductReport.parser';
import { RetailProductHistoryParser } from './shared/parsers/retail/retailProductHistory.parser';
import { UnitInfoService } from './shared/services/unitInfo.service';
import { SettingsService } from './modules/shared/services/settings.service';

@NgModule({
    declarations: [
        LetDirective,
        ControlPanelComponent,
        AppComponent,
        ToolbarComponent,
        UnitsTableComponent,

        PriceComponent,
        SupplyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule,
        TableModule,
        StoreModule.forRoot(Reducers)
    ],
    providers: [
        ApiService,
        ForecastParser,
        UnitSummaryParser,

        RetailTradingHallParser,
        RetailProductReportParser,
        RetailProductHistoryParser,

        SettingsService,
        UnitInfoService,
        GlobalsService
    ],
    entryComponents: [
        AppComponent,
        ToolbarComponent
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
                console.clear();

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

                // bootstrap toolbar
                const toolbarEl = document.createElement('app-toolbar');
                document.body.appendChild(toolbarEl);
                app.bootstrap(ToolbarComponent);
            })
        ).subscribe().unsubscribe();
    }
}
