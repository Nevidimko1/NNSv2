import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, globals } from 'src/app/shared/appState';
import { LS } from 'src/app/utils/storage.utils';
import { UnitsTableItem } from '../../unitsTable/models/unitsTableItem.model';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';
import { PriceStorageSettings } from '../models/price.storageSettings';
import { SupplyStorageSettings } from '../models/supply.storageSettings';
import { PriceStrategies, MinPrices } from '../configs/price.config';
import { SupplyStrategies, MinSupplies, MaxSupplyValues } from '../configs/supply.config';

@Injectable()
export class SettingsService {

    constructor(private store: Store<AppState>) { }

    public loadSettings = (units: UnitsTableItem[]): Observable<UnitsTableItem[]> => {
        return this.store.pipe(
            select(globals),
            map((state: IGlobalsState) => {
                const priceSetting = LS.get(`${state.info.realm}/${state.info.companyId}/prices`),
                    prices: PriceStorageSettings[] = priceSetting && priceSetting.data || [];
                const supplySetting = LS.get(`${state.info.realm}/${state.info.companyId}/supplies`),
                    supplies: SupplyStorageSettings[] = supplySetting && supplySetting.data || [];

                let ex: UnitsTableItem;
                prices.forEach(price => {
                    ex = units.filter(item => item.id === price.unitId)[0];
                    if (ex) {
                        ex.priceState.strategy = PriceStrategies.filter(strategy => strategy.id === price.strategyId)[0];
                        ex.priceState.min = MinPrices.filter(min => min.name === price.minName)[0];
                    }
                });
                supplies.forEach(supply => {
                    ex = units.filter(item => item.id === supply.unitId)[0];
                    if (ex) {
                        ex.supplyState.strategy = SupplyStrategies.filter(strategy => strategy.id === supply.strategyId)[0];
                        ex.supplyState.min = MinSupplies.filter(min => min.name === supply.minName)[0];
                        ex.supplyState.maxValue = MaxSupplyValues.filter(max => max.name === supply.maxValueName)[0];
                    }
                });
                return units;
            })
        );
    }

    public savePrices = (units: UnitsTableItem[]): Observable<UnitsTableItem[]> => {
        return this.store.pipe(
            select(globals),
            map((state: IGlobalsState) => {
                const updatedPrices: PriceStorageSettings[] = units.map(unit => ({
                    unitId: unit.id,
                    strategyId: unit.priceState.strategy && unit.priceState.strategy.id,
                    minName: unit.priceState.min && unit.priceState.min.name
                }));

                const priceSetting = LS.get(`${state.info.realm}/${state.info.companyId}/prices`),
                    prices: PriceStorageSettings[] = priceSetting && priceSetting.data || [];

                let ex: PriceStorageSettings;
                updatedPrices.forEach(price => {
                    ex = prices.filter(p => p.unitId === price.unitId)[0];
                    if (ex) {
                        prices[prices.indexOf(ex)] = price;
                    } else {
                        prices.push(price);
                    }
                });

                if (updatedPrices.length) {
                    LS.set(`${state.info.realm}/${state.info.companyId}/prices`, prices);
                }
                return units;
            })
        );
    }

    public saveSupplies = (units: UnitsTableItem[]): Observable<UnitsTableItem[]> => {
        return this.store.pipe(
            select(globals),
            map((state: IGlobalsState) => {
                const updatedSupplies: SupplyStorageSettings[] = units.map(unit => ({
                    unitId: unit.id,
                    strategyId: unit.supplyState.strategy && unit.supplyState.strategy.id,
                    minName: unit.supplyState.min && unit.supplyState.min.name,
                    maxValueName: unit.supplyState.maxValue && unit.supplyState.maxValue.name
                }));

                const supplySetting = LS.get(`${state.info.realm}/${state.info.companyId}/supplies`),
                    supplies: SupplyStorageSettings[] = supplySetting && supplySetting.data || [];

                let ex: SupplyStorageSettings;
                updatedSupplies.forEach(supply => {
                    ex = supplies.filter(s => s.unitId === supply.unitId)[0];
                    if (ex) {
                        supplies[supplies.indexOf(ex)] = supply;
                    } else {
                        supplies.push(supply);
                    }
                });

                if (updatedSupplies.length) {
                    LS.set(`${state.info.realm}/${state.info.companyId}/supplies`, supplies);
                }
                return units;
            })
        );
    }
}
