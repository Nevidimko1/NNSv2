import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UnitsTableService
    ]
})
export class UnitsTableComponent implements OnDestroy {

    protected columns: Observable<Column[]>;
    protected data: Observable<UnitsTableItem[]>;

    private selected: UnitsTableItem[];

    private _selected: Subject<void>;
    private _selectedSub: Subscription;

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

        this._selected = new Subject<void>();
        this._selectedSub = this._selected.pipe(
            debounceTime(0),
            map(() => this.service.updateSelection(this.selected))
        ).subscribe();
    }

    ngOnDestroy() {
        this._selectedSub.unsubscribe();
    }

    rowTrackBy = (index: number, item: UnitsTableItem) => item.id;

    productivityClass = (productivity: number): string => {
        if (productivity == null) {
            return 'status-info';
        } else if (productivity < 0.5) {
            return 'status-danger';
        } else if (productivity >= 0.5 && productivity < 1) {
            return 'status-warning';
        } else if (productivity >= 1) {
            return 'status-success';
        } else {
            return '';
        }
    }

    updateSelection = () => this._selected.next();
}
