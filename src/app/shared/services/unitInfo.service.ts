import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, map, tap, flatMap } from 'rxjs/operators';

import { AppState, globals, unitsTable } from '../appState';
import { SettingsService } from 'src/app/modules/shared/services/settings.service';
import { ForecastParser } from '../parsers/forecast.parser';
import { UnitSummaryParser } from '../parsers/unitSummary.parser';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';
import { ApiService } from './api.service';
import { refreshCacheUrl, forecastUrl, summaryUrl } from '../api';
import { IUnitForecastResponse } from 'src/app/models/unitForecast/unitForecastResponse.model';
import { UnitForecast } from 'src/app/models/unitForecast/unitForecast.model';
import { UnitsTableActions, UnitsTableState } from 'src/app/modules/unitsTable/unitsTable.reducer';
import { IUnitSummaryResponse } from 'src/app/models/unitSummary/unitSummaryResponse.model';
import { UnitSummary } from 'src/app/models/unitSummary/unitSummary.model';
import { TopUtils } from 'src/app/utils/top.utils';
import { UnitCommonInfo } from 'src/app/models/unitInfo/unitCommonInfo.model';
import { Unit } from 'src/app/models/unitInfo/unit.model';

@Injectable()
export class UnitInfoService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private settingsService: SettingsService,
        private forecastParser: ForecastParser,
        private unitSummaryParser: UnitSummaryParser,
    ) {}

    private refreshCache$ = (unitId: number): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((state: IGlobalsState) => this.apiService.post(refreshCacheUrl(state.info.realm), { id: unitId, token: state.token }))
        );
    }

    private populateEfficiencyTomorrow$ = (unitId: number): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((state: IGlobalsState) => this.apiService.post<IUnitForecastResponse>(
                forecastUrl(state.info.realm), { unit_id: unitId })
            ),
            map(response => this.forecastParser.parse(response)),
            tap((data: UnitForecast) => this.store.dispatch({
                type: UnitsTableActions.SET_FORECAST,
                payload: { id: unitId, forecast: data }
            }))
        );
    }

    private fetchUnitSummary$ = (unitId: number): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((state: IGlobalsState) => this.apiService.get<IUnitSummaryResponse>(summaryUrl(state.info.realm, unitId))),
            flatMap(response => this.unitSummaryParser.parse(response)),
            tap((data: UnitSummary) => this.store.dispatch({ type: UnitsTableActions.SET_SUMMARY, payload: { id: unitId, summary: data } }))
        );
    }

    private populateCommon$ = (unitId: number): Observable<any> => {
        return this.store.pipe(
            select(unitsTable),
            first(),
            map((state: UnitsTableState) => state.values.filter(item => item.id === unitId)[0]),
            map(unit => this.store.dispatch({ type: UnitsTableActions.SET_COMMON, payload: {id: unitId, common: new UnitCommonInfo({
                top1: TopUtils.calculateTop1Load(unit),
                top3: TopUtils.calculateTop3Load(unit)
            })}}))
        );
    }

    private saveSettings$ = (unitId: number): Observable<any> => {
        return this.store.select(unitsTable).pipe(
            first(),
            map((state: UnitsTableState) => state.values.filter(unit => unit.id === unitId)[0]),
            flatMap(unit => this.settingsService.saveSettings$([unit]))
        );
    }

    public update$ = (unit: Unit): Observable<any> => {
        return of([]).pipe(
            flatMap(() => this.refreshCache$(unit.id)),
            flatMap(() => this.populateEfficiencyTomorrow$(unit.id)),
            flatMap(() => this.fetchUnitSummary$(unit.id)),
            flatMap(() => this.populateCommon$(unit.id)),
            flatMap(() => this.saveSettings$(unit.id)),
        );
    }
}
