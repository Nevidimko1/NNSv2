import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, unitsTable } from '../../shared/appState';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitsTableState } from '../unitsTable/unitsTable.reducer';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './toolbar.component.less'
    ]
})
export class ToolbarComponent {
    private readonly PRICE_UNIT_TYPES = ['shop', 'workshop', 'warehouse'];
    private readonly SUPPLY_UNIT_TYPES = ['shop', 'workshop', 'warehouse'];

    protected selectedUnits: Observable<UnitsTableItem[]>;
    protected selectedTypes: Observable<string[]>;
    protected priceEnabled: Observable<boolean>;
    protected supplyEnabled: Observable<boolean>;

    constructor(
        private store: Store<AppState>
    ) {
        this.selectedUnits = this.store.pipe(
            select(unitsTable),
            map((state: UnitsTableState) => state.selected)
        );

        this.selectedTypes = this.selectedUnits.pipe(
            map((units: UnitsTableItem[]) => units.reduce((r, u) => {
                if (r.indexOf(u.type) === -1) {
                    r.push(u.type);
                }
                return r;
            }, []))
        );

        this.priceEnabled = this.selectedTypes.pipe(
            map(type => type.length && !type.filter(t => this.PRICE_UNIT_TYPES.indexOf(t) === -1).length)
        );
        this.supplyEnabled = this.selectedTypes.pipe(
            map(type => type.length && !type.filter(t => this.SUPPLY_UNIT_TYPES.indexOf(t) === -1).length)
        );
    }
}
