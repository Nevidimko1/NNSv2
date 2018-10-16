import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, unitsList, globals } from '../../shared/appState';
import { Subscription, Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { UnitsTableActions } from './unitsTable.reducer';
import { UnitsListState } from '../../reducers/unitsList.reducer';
import { UnitsTableItem } from './models/unitsTableItem.model';
import { Unit } from 'src/app/models/unitInfo/unit.model';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';
import { LS } from 'src/app/utils/storage.utils';
import { PriceSettings } from 'src/app/models/unitSettings/priceSettings.model';
import { PriceStorageSettings } from '../shared/models/price.storageSettings';
import { PriceState } from '../shared/models/price.state';
import { PriceStrategies, MinPrices } from '../shared/configs/price.config';
import { SupplyStorageSettings } from '../shared/models/supply.storageSettings';
import { SupplyStrategies, MinSupplies, MaxSupplyValues } from '../shared/configs/supply.config';
import { SettingsService } from '../shared/services/settings.service';

@Injectable()
export class UnitsTableService implements OnDestroy {

    private unitsListSub: Subscription;

    constructor(
        private store: Store<AppState>,
        private settingsService: SettingsService
    ) {
        this.unitsListSub = store.pipe(
            select(unitsList),
            map((state: UnitsListState) => state.values.map((unit: Unit) => new UnitsTableItem(unit))),
            flatMap((items: UnitsTableItem[]) => this.settingsService.loadSettings(items)),
            map((items: UnitsTableItem[]) => this.store.dispatch({ type: UnitsTableActions.INIT, payload: items }))
        ).subscribe();
    }

    ngOnDestroy() {
        this.unitsListSub.unsubscribe();
    }

    public updateSelection = (items: UnitsTableItem[]) => this.store.dispatch({ type: UnitsTableActions.UPDATE_SELECTION, payload: items});

}
