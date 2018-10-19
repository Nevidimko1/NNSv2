import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, flatMap, first } from 'rxjs/operators';

import { AppState, globals } from '../appState';
import { unitTypesListUrl } from '../api';
import { UnitsTypesActions } from '../../reducers/unitsTypes.reducer';
import { UnitsTypesParser } from '../parsers/unitsTypes.parser';
import { UnitType } from '../../models/unitType/unitType.model';
import { IGlobalsState } from '../../reducers/globals.reducer';
import { UNIT_TYPES } from '../unitTypes.enum';
import { ApiService } from './api.service';
import { IUnitTypesResponse } from 'src/app/models/unitType/unitTypeResponse.model';

@Injectable()
export class UnitsTypesService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private unitsTypesParser: UnitsTypesParser
    ) { }

    public fetchUnitTypesList$ = (): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((g: IGlobalsState) => this.apiService.get<IUnitTypesResponse>(unitTypesListUrl(g.info.realm))),
            flatMap(response => this.unitsTypesParser.parse(response)),
            map((unitTypes: UnitType[]) => {
                // check if enums should be updated or not
                const types = unitTypes.reduce((r, t) => r.indexOf(t.kind) === -1 ? [...r, t.kind] : r, []),
                    enumTypes = Object.keys(UNIT_TYPES).map(k => UNIT_TYPES[k]),
                    diff = !!types.filter(t => enumTypes.indexOf(t) === -1)[0];

                if (diff) {
                    console.error('UNIT_TYPES ENUM SHOULD BE UPDATED');
                }

                return unitTypes;
            }),
            map((unitTypes: UnitType[]) => this.store.dispatch({ type: UnitsTypesActions.INIT, payload: unitTypes }))
        );
    }
}
