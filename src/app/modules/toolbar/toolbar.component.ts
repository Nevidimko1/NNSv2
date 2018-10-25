import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first, flatMap, combineLatest } from 'rxjs/operators';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
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
            map((units: UnitsTableItem[]) => units.map(unit => unit.info)),
            map(infos => CommonUtils.uniqueValues(infos, 'unitTypeSymbol'))
        );
    }

    private update = (action: string, value: any): Observable<any> => {
        return this.selectedUnits$.pipe(
            first(),
            map((items: UnitsTableItem[]) => items.forEach((item: UnitsTableItem) => this.store.dispatch(
                { type: action, payload: { id: item.id, value } }
            ))),
            flatMap(() => this.selectedUnits$),
            first(),
            flatMap(units => this.settingsService.saveSettings$(units))
        );
    }

    onPriceStrategyChange = (value: IPriceStrategy): any => this.update(UnitsTableActions.SET_PRICE_STRATEGY, value).subscribe();
    onMinPriceChange = (value: number): any => this.update(UnitsTableActions.SET_PRICE_MIN, value).subscribe();

    onSupplyStrategyChange = (value: ISupplyStrategy): any => this.update(UnitsTableActions.SET_SUPPLY_STRATEGY, value).subscribe();
    onMinSupplyChange = (value: number): any => this.update(UnitsTableActions.SET_SUPPLY_MIN, value).subscribe();
    onMaxSupplyValueChange = (value: number): any => this.update(UnitsTableActions.SET_SUPPLY_MAX_VALUE, value).subscribe();
}
