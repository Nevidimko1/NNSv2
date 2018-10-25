import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';

import { AppState, globals } from 'src/app/shared/appState';
import { LS } from 'src/app/utils/storage.utils';
import { UnitsTableItem } from '../../unitsTable/models/unitsTableItem.model';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';
import { PriceStrategies, MinPrices } from '../configs/price.config';
import { SupplyStrategies, MinSupplies, MaxSupplyValues } from '../configs/supply.config';
import { UnitCommonInfo } from 'src/app/models/unitInfo/unitCommonInfo.model';
import { UnitSummary } from 'src/app/models/unitSummary/unitSummary.model';
import { UnitForecast } from 'src/app/models/unitForecast/unitForecast.model';

@Injectable()
export class SettingsService {

    constructor(
        private store: Store<AppState>
    ) { }

    private loadUnitSettings$ = (unit: UnitsTableItem): Observable<UnitsTableItem> => {
        return this.store.pipe(
            select(globals),
            first(),
            map((state: IGlobalsState) => LS.get(`${state.info.realm}/${unit.id}`)),
            tap(settings => {
                if (settings && settings.today) {
                    unit.common = settings.data._common && new UnitCommonInfo(settings.data._common._data);
                    unit.summary = settings.data._summary && new UnitSummary(settings.data._summary._data);
                    unit.forecast = settings.data._forecast && new UnitForecast(settings.data._forecast._data);
                }

                unit.priceState.strategy = settings.data._priceState.strategy &&
                    PriceStrategies.filter(stg => stg.id === settings.data._priceState.strategy.id)[0];
                unit.priceState.min = settings.data._priceState.min &&
                    MinPrices.filter(min => min.name === settings.data._priceState.min.name)[0];

                unit.supplyState.strategy = settings.data._supplyState.strategy &&
                    SupplyStrategies.filter(stg => stg.id === settings.data._supplyState.strategy.id)[0];
                unit.supplyState.min = settings.data._supplyState.min &&
                    MinSupplies.filter(min => min.name === settings.data._supplyState.min.name)[0];
                unit.supplyState.maxValue = settings.data._supplyState.maxValue &&
                    MaxSupplyValues.filter(max => max.name === settings.data._supplyState.maxValue.name)[0];
            }),
            map(() => unit)
        );
    }

    private saveUnitSettings$ = (unit: UnitsTableItem): Observable<any> => {
        return this.store.select(globals).pipe(
            first(),
            tap((state: IGlobalsState) => LS.set(`${state.info.realm}/${unit.id}`, unit))
        );
    }

    public saveSettings$ = (units: UnitsTableItem[]): Observable<any> => {
        return combineLatest(units.map(unit => this.saveUnitSettings$(unit)));
    }

    public loadSettings$ = (units: UnitsTableItem[]): Observable<UnitsTableItem[]> => {
        return combineLatest(units.map(unit => this.loadUnitSettings$(unit)));
    }
}
