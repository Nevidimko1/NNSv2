import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { AppState, unitsTable } from '../../shared/appState';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitsTableState, UnitsTableActions } from '../unitsTable/unitsTable.reducer';
import { IPriceStrategy } from '../../models/strategy/priceStrategy.model';
import { CommonUtils } from '../../utils/common.utils';
import { ISupplyStrategy } from '../../models/strategy/supplyStrategy.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './toolbar.component.less'
    ]
})
export class ToolbarComponent {

    protected selectedUnits$: Observable<UnitsTableItem[]>;
    protected selectedTypes$: Observable<string[]>;

    constructor(
        private store: Store<AppState>
    ) {
        this.selectedUnits$ = this.store.pipe(
            select(unitsTable),
            map((state: UnitsTableState) => state.selected)
        );

        this.selectedTypes$ = this.selectedUnits$.pipe(
            map((units: UnitsTableItem[]) => CommonUtils.uniqueValues(units, 'type'))
        );
    }

    private update = (action: string, value: any): void => {
        this.selectedUnits$.pipe(
            first(),
            map((items: UnitsTableItem[]) => items.forEach((item: UnitsTableItem) => this.store.dispatch(
                { type: action, payload: { id: item.id, value } }
            )))
        ).subscribe();
    }

    onPriceStrategyChange = (value: IPriceStrategy): void => this.update(UnitsTableActions.SET_PRICE_STRATEGY, value);
    onMinPriceChange = (value: number): void => this.update(UnitsTableActions.SET_PRICE_MIN, value);

    onSupplyStrategyChange = (value: ISupplyStrategy): void => this.update(UnitsTableActions.SET_SUPPLY_STRATEGY, value);
    onMinSupplyChange = (value: number): void => this.update(UnitsTableActions.SET_SUPPLY_MIN, value);
    onMaxSupplyValueChange = (value: number): void => this.update(UnitsTableActions.SET_SUPPLY_MAX_VALUE, value);
}
