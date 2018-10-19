import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, flatMap, first, tap } from 'rxjs/operators';

import { AppState, globals } from '../appState';
import { unitListUrl } from '../api';
import { UnitsListParser } from '../parsers/unitsList.parser';
import { UnitsListActions } from '../../reducers/unitsList.reducer';
import { IGlobalsState } from '../../reducers/globals.reducer';
import { ApiService } from './api.service';
import { IUnitsResponse } from 'src/app/models/unitInfo/unitResponse.model';
import { Unit } from 'src/app/models/unitInfo/unit.model';

@Injectable()
export class UnitsListService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private unitsListParser: UnitsListParser
    ) { }

    public fetchUnitsList$ = (): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((state: IGlobalsState) => this.apiService.get<IUnitsResponse>(unitListUrl(state.info.realm, state.info.companyId))),
            flatMap(response => this.unitsListParser.parse(response)),
            tap((units: Unit[]) => this.store.dispatch({ type: UnitsListActions.INIT, payload: units }))
        );
    }
}
