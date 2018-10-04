import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, globals, unitsTableColumnSettings } from '../../shared/appState';
import { Observable } from 'rxjs';
import { Unit } from '../../models/unitInfo/unit.model';
import { map } from 'rxjs/operators';
import { IGlobals } from '../../models/globals.model';
import { UnitsTableColumnSettings } from './unitsTableColumnSettings.model';
import { Column } from '../../models/table/column.model';

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
            select(globals),
            map((state: IGlobals) => state.unitsList)
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
