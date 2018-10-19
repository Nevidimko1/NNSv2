import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, flatMap, first } from 'rxjs/operators';

import { AppState, unitsTable } from 'src/app/shared/appState';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitsTableState } from '../unitsTable/unitsTable.reducer';
import { ControlPanelService } from './controlPanel.service';

@Component({
    selector: 'app-control-panel',
    templateUrl: './controlPanel.component.html',
    styleUrls: [
        '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        './controlPanel.component.less'
    ],
    providers: [
        ControlPanelService
    ]
})
export class ControlPanelComponent {

    units$: Observable<UnitsTableItem[]>;

    constructor (
        private store: Store<AppState>,
        private service: ControlPanelService
    ) {
        this.units$ = this.store.pipe(
            select(unitsTable),
            map((state: UnitsTableState) => state.selected.length ? state.selected : state.values)
        );
    }

    update = () => {
        this.units$.pipe(
            first(),
            flatMap(units => this.service.updateUnits$(units.map(unit => unit.info)))
        ).subscribe();
    }
}
