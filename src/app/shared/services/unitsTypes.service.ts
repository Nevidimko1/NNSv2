import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, flatMap, first } from 'rxjs/operators';

import { AppState, globals } from '../appState';
import { unitTypesListUrl } from '../api';
import { UnitsTypesActions } from '../../reducers/unitsTypes.reducer';
import { UnitsTypesParser } from '../parsers/unitsTypes.parser';
import { UnitType } from '../../models/unitType/unitType.model';
import { IGlobalsState } from '../../reducers/globals.reducer';

@Injectable()
export class UnitsTypesService {
    constructor(
        private store: Store<AppState>,
        private http: Http,
        private unitsTypesParser: UnitsTypesParser
    ) { }

    public fetchUnitTypesList$ = (): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((g: IGlobalsState) => this.http.get(unitTypesListUrl(g.info.realm))),
            map((response: Response) => this.unitsTypesParser.parse(response)),
            map((unitTypes: UnitType[]) => this.store.dispatch({ type: UnitsTypesActions.INIT, payload: unitTypes }))
        );
    }
}
