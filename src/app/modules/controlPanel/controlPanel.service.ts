import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, forkJoin, of } from 'rxjs';
import { first, map, flatMap, tap } from 'rxjs/operators';

import { Unit } from 'src/app/models/unitInfo/unit.model';
import { forecastUrl, refreshCacheUrl, summaryUrl } from 'src/app/shared/api';
import { AppState, globals, unitsTable } from 'src/app/shared/appState';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';
import { ApiService } from 'src/app/shared/services/api.service';
import { IUnitForecastResponse } from 'src/app/models/unitForecast/unitForecastResponse.model';
import { ForecastParser } from 'src/app/shared/parsers/forecast.parser';
import { UnitsTableActions, UnitsTableState } from '../unitsTable/unitsTable.reducer';
import { IUnitSummaryResponse } from 'src/app/models/unitSummary/unitSummaryResponse.model';
import { UnitSummaryParser } from 'src/app/shared/parsers/unitSummary.parser';
import { UnitCommonInfo } from 'src/app/models/unitInfo/unitCommonInfo.model';
import { TopUtils } from 'src/app/utils/top.utils';
import { UnitSummary } from 'src/app/models/unitSummary/unitSummary.model';
import { UnitForecast } from 'src/app/models/unitForecast/unitForecast.model';

@Injectable()
export class ControlPanelService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private forecastParser: ForecastParser,
        private unitSummaryParser: UnitSummaryParser
    ) { }

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

    updateUnits$ = (units: Unit[]): Observable<any> => {
        return forkJoin(units.map(unit => of([]).pipe(
            flatMap(() => this.refreshCache$(unit.id)),
            flatMap(() => this.populateEfficiencyTomorrow$(unit.id)),
            flatMap(() => this.fetchUnitSummary$(unit.id)),
            flatMap(() => this.populateCommon$(unit.id)),
        )));
    }
}
