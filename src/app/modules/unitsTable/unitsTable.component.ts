import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, unitsTableColumnSettings, unitsList } from '../../shared/appState';
import { Unit } from '../../models/unitInfo/unit.model';
import { UnitsTableColumnSettings } from './unitsTableColumnSettings.model';
import { Column } from '../../models/table/column.model';
import { UnitsListState } from '../../reducers/unitsList.reducer';

@Component({
    selector: 'app-units-table',
    templateUrl: './unitsTable.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './unitsTable.component.less'
    ]
})
export class UnitsTableComponent {

    protected columns: Observable<Column[]>;
    protected units: Observable<Unit[]>;

    constructor(
        private store: Store<AppState>
    ) {
        this.columns = this.store.pipe(
            select(unitsTableColumnSettings),
            map((state: UnitsTableColumnSettings) => state.columns)
        );
        this.units = this.store.pipe(
            select(unitsList),
            map((state: UnitsListState) => state.values)
        );
    }

    productivityClass = (productivity: number): string => {
        if (productivity == null) {
            return 'status-info';
        } else if (productivity < 0.5) {
            return 'status-danger';
        } else if (productivity >= 0.5 && productivity < 1) {
            return 'status-warning';
        } else if (productivity === 1) {
            return 'status-success';
        } else {
            return '';
        }
    }
}
