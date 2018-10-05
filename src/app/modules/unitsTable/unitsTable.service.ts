import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, unitsList } from '../../shared/appState';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnitsTableActions } from './unitsTable.reducer';
import { UnitsListState } from '../../reducers/unitsList.reducer';
import { UnitsTableItem } from './models/unitsTableItem.model';

@Injectable()
export class UnitsTableService implements OnDestroy {

    private unitsListSub: Subscription;

    constructor(
        private store: Store<AppState>
    ) {
        this.unitsListSub = store.pipe(
            select(unitsList),
            map((state: UnitsListState) => this.store.dispatch({ type: UnitsTableActions.INIT, payload: state.values }))
        ).subscribe();
    }

    updateSelection = (items: UnitsTableItem[]) => this.store.dispatch({ type: UnitsTableActions.UPDATE_SELECTION, payload: items});

    ngOnDestroy() {
        this.unitsListSub.unsubscribe();
    }
}
