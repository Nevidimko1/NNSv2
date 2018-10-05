import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, flatMap, first } from 'rxjs/operators';

import { AppState, globals } from '../appState';
import { unitListUrl } from '../api';
import { UnitsListParser } from '../parsers/unitsList.parser';
import { UnitsListActions } from '../../reducers/unitsList.reducer';
import { IGlobalsState } from '../../reducers/globals.reducer';

@Injectable()
export class UnitsListService {
    constructor(
        private store: Store<AppState>,
        private http: Http,
        private unitsListParser: UnitsListParser
    ) { }

    public fetchUnitsList$ = (): Observable<any> => {
        let realm: string;
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((g: IGlobalsState) => {
                realm = g.info.realm;
                return this.http.get(unitListUrl(g.info.realm, g.info.companyId));
            }),
            map((response: Response) => this.store.dispatch({
                type: UnitsListActions.INIT,
                payload: this.unitsListParser.parse(response, realm)
            }))
        );
    }
}
