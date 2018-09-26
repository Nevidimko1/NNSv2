import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, globals } from '../../shared/appState';
import { Observable } from 'rxjs';
import { IUnitItem } from '../../models/unitInfo.model';
import { map } from 'rxjs/operators';
import { IGlobals } from '../../models/globals.model';

@Component({
    selector: 'app-units-table',
    templateUrl: './unitsTable.component.html',
    styleUrls: ['./unitsTable.component.less']
})
export class UnitsTableComponent {

    protected units: Observable<IUnitItem[]>;

    constructor(
        private store: Store<AppState>
    ) {
        this.units = this.store.pipe(
            select(globals),
            map((state: IGlobals) => state.unitsList)
        );
    }
}
