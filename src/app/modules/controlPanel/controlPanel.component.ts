import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, interval, Subscription, merge, } from 'rxjs';
import { map, flatMap, first, tap, takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { AppState, unitsTable, controlPanel } from 'src/app/shared/appState';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitsTableState } from '../unitsTable/unitsTable.reducer';
import { ControlPanelService } from './controlPanel.service';
import { SettingsService } from '../shared/services/settings.service';
import { ControlPanelState, ControlPanelActions } from './controlPanel.reducer';
import { RetailPricesService } from 'src/app/shared/services/retailPrices.service';

@Component({
    selector: 'app-control-panel',
    templateUrl: './controlPanel.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './controlPanel.component.less'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ControlPanelService,
        SettingsService,
        RetailPricesService
    ]
})
export class ControlPanelComponent implements OnDestroy {

    private state$: Observable<ControlPanelState>;
    private units$: Observable<UnitsTableItem[]>;

    private resetProgressSubscription: Subscription;

    protected actionsDisabled$: Observable<boolean>;

    constructor (
        private store: Store<AppState>,
        private service: ControlPanelService
    ) {
        this.state$ = this.store.pipe(
            select(controlPanel)
        );
        this.actionsDisabled$ = this.state$.pipe(
            map((state: ControlPanelState) => state.runInProgress || state.updateInProgress)
        );

        this.units$ = this.store.pipe(
            select(unitsTable),
            map((state: UnitsTableState) => state.selected.length ? state.selected : state.values)
        );

        this.resetProgressSubscription = this.units$.pipe(
            distinctUntilChanged(),
            tap(() => this.store.dispatch({ type: ControlPanelActions.RESET_CURRENT_PROGRESS }))
        ).subscribe();
    }

    ngOnDestroy() {
        this.resetProgressSubscription.unsubscribe();
    }

    update = () => {
        merge(
            interval(1000).pipe(
                tap(() => this.store.dispatch({ type: ControlPanelActions.UPDATE_ELAPSED_TIME }))
            ),
            this.service.ajax$.pipe(
                tap(() => this.store.dispatch({ type: ControlPanelActions.INCREMENT_AJAX }))
            )
        ).pipe(
            takeUntil(
                this.units$.pipe(
                    first(),
                    flatMap(units => this.service.updateUnits$(units.map(unit => unit.info)))
                )
            )
        ).subscribe();
    }

    run = () => {
        merge(
            interval(1000).pipe(
                tap(() => this.store.dispatch({ type: ControlPanelActions.UPDATE_ELAPSED_TIME }))
            ),
            this.service.ajax$.pipe(
                tap(() => this.store.dispatch({ type: ControlPanelActions.INCREMENT_AJAX }))
            )
        ).pipe(
            takeUntil(
                this.units$.pipe(
                    first(),
                    flatMap(units => this.service.runUnits$(units))
                )
            )
        ).subscribe();
    }
}
