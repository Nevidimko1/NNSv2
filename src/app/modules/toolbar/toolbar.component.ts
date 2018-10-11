import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, unitsTable } from '../../shared/appState';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitsTableState } from '../unitsTable/unitsTable.reducer';
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

    onPriceStrategyChange = (value: IPriceStrategy): void => console.log(value);
    onMinPriceChange = (value: number): void => console.log(value);

    onSupplyStrategyChange = (value: ISupplyStrategy): void => console.log(value);
    onMinSupplyChange = (value: number): void => console.log(value);
    onMaxSupplyValueChange = (value: number): void => console.log(value);
}
