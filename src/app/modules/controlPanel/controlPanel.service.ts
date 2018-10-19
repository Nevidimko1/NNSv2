import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, forkJoin, of } from 'rxjs';
import { first, map, flatMap, tap } from 'rxjs/operators';

import { Unit } from 'src/app/models/unitInfo/unit.model';
import { forecastUrl, refreshCacheUrl } from 'src/app/shared/api';
import { AppState, globals } from 'src/app/shared/appState';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';
import { ApiService } from 'src/app/shared/services/api.service';
import { IForecastResponse } from 'src/app/models/forecast/forecastResponse.model';
import { ForecastParser } from 'src/app/shared/parsers/forecast.parser';

@Injectable()
export class ControlPanelService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private forecastParser: ForecastParser
    ) { }

    private refreshCache$ = (unit: Unit): Observable<Unit> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((state: IGlobalsState) => this.apiService.post(refreshCacheUrl(state.info.realm), { id: unit.id, token: state.token })),
            map(() => unit)
        );
    }

    private populateEfficiencyTomorrow$ = (unit: Unit): Observable<Unit> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((state: IGlobalsState) => this.apiService.post<IForecastResponse>(forecastUrl(state.info.realm), { unit_id: unit.id })),
            map(response => this.forecastParser.parse(response)),
            tap(data => unit.productivityTomorrow = data.productivity),
            map(() => unit)
        );
    }

    updateUnits$ = (units: Unit[]): Observable<any> => {
        return forkJoin(units.map(item => of(item).pipe(
            flatMap(unit => this.refreshCache$(unit)),
            flatMap(unit => this.populateEfficiencyTomorrow$(unit))
        )));
    }
}
