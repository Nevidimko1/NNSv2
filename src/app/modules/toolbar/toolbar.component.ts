import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first, flatMap } from 'rxjs/operators';

import { AppState, unitsTable } from '../../shared/appState';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitsTableState, UnitsTableActions } from '../unitsTable/unitsTable.reducer';
import { IPriceStrategy } from '../../models/strategy/priceStrategy.model';
import { CommonUtils } from '../../utils/common.utils';
import { ISupplyStrategy } from '../../models/strategy/supplyStrategy.model';
import { SettingsService } from '../shared/services/settings.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './toolbar.component.less'
    ],
    providers: [
        SettingsService
    ]
})
export class ToolbarComponent {

    protected selectedUnits$: Observable<UnitsTableItem[]>;
    protected selectedTypes$: Observable<string[]>;

    constructor(
        private store: Store<AppState>,
        private settingsService: SettingsService
    ) {
        this.selectedUnits$ = this.store.pipe(
            select(unitsTable),
            map((state: UnitsTableState) => state.selected)
        );

        this.selectedTypes$ = this.selectedUnits$.pipe(
            map((units: UnitsTableItem[]) => CommonUtils.uniqueValues(units, 'type'))
        );
    }

    private update = (action: string, value: any): Observable<UnitsTableItem[]> => {
        return this.selectedUnits$.pipe(
            first(),
            map((items: UnitsTableItem[]) => items.forEach((item: UnitsTableItem) => this.store.dispatch(
                { type: action, payload: { id: item.id, value } }
            ))),
            flatMap(() => this.selectedUnits$)
        );
    }

    onPriceStrategyChange = (value: IPriceStrategy): any => this.update(UnitsTableActions.SET_PRICE_STRATEGY, value)
        .pipe(flatMap(units => this.settingsService.savePrices(units))).subscribe()
    onMinPriceChange = (value: number): any => this.update(UnitsTableActions.SET_PRICE_MIN, value)
        .pipe(flatMap(units => this.settingsService.savePrices(units))).subscribe()

    onSupplyStrategyChange = (value: ISupplyStrategy): any => this.update(UnitsTableActions.SET_SUPPLY_STRATEGY, value)
        .pipe(flatMap(units => this.settingsService.saveSupplies(units))).subscribe()
    onMinSupplyChange = (value: number): any => this.update(UnitsTableActions.SET_SUPPLY_MIN, value)
        .pipe(flatMap(units => this.settingsService.saveSupplies(units))).subscribe()
    onMaxSupplyValueChange = (value: number): any => this.update(UnitsTableActions.SET_SUPPLY_MAX_VALUE, value)
        .pipe(flatMap(units => this.settingsService.saveSupplies(units))).subscribe()
}
