import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, flatMap, filter, first } from 'rxjs/operators';

import { AppState, unitsList } from '../../shared/appState';
import { UnitsTableActions } from './unitsTable.reducer';
import { UnitsListState } from '../../reducers/unitsList.reducer';
import { UnitsTableItem } from './models/unitsTableItem.model';
import { Unit } from 'src/app/models/unitInfo/unit.model';
import { SettingsService } from '../shared/services/settings.service';

@Injectable()
export class UnitsTableService {

    constructor(
        private store: Store<AppState>,
        private settingsService: SettingsService
    ) {
        // init table
        store.pipe(
            select(unitsList),
            filter((state: UnitsListState) => state && !!state.values.length),
            first(),
            map((state: UnitsListState) => state.values.map((unit: Unit) => new UnitsTableItem(unit))),
            flatMap((items: UnitsTableItem[]) => this.settingsService.loadSettings(items)),
            map((items: UnitsTableItem[]) => this.store.dispatch({ type: UnitsTableActions.INIT, payload: items }))
        ).subscribe();
    }

    public updateSelection = (items: UnitsTableItem[]) => this.store.dispatch({ type: UnitsTableActions.UPDATE_SELECTION, payload: items});

}
