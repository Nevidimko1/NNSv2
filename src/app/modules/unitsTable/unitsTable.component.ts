import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, unitsTableColumnSettings, unitsTable } from '../../shared/appState';
import { UnitsTableColumnSettings } from './unitsTableColumnSettings.model';
import { Column } from '../../models/table/column.model';
import { UnitsTableService } from './unitsTable.service';
import { UnitsTableItem } from './models/unitsTableItem.model';
import { UnitsTableState } from './unitsTable.reducer';

@Component({
    selector: 'app-units-table',
    templateUrl: './unitsTable.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './unitsTable.component.less'
    ],
    providers: [
        UnitsTableService
    ]
})
export class UnitsTableComponent {

    protected columns: Observable<Column[]>;
    protected data: Observable<UnitsTableItem[]>;

    private selected: UnitsTableItem[];

    constructor(
        private store: Store<AppState>,
        protected service: UnitsTableService
    ) {
        this.selected = [];
        this.columns = this.store.pipe(
            select(unitsTableColumnSettings),
            map((state: UnitsTableColumnSettings) => state.columns)
        );
        this.data = this.store.pipe(
            select(unitsTable),
            map((state: UnitsTableState) => state.values)
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

    updateSelection = () => setTimeout(() => this.service.updateSelection(this.selected));
}
