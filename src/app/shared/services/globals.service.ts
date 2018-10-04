import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as $ from 'jquery';
import { map, first, flatMap } from 'rxjs/operators';

import { CookiesUtils } from '../../utils/cookies.utils';
import { AppState, globals } from '../appState';
import { GlobalsActions, IGlobalsInfo, IGlobalsState } from '../../reducers/globals.reducer';
import { tokenUrl } from '../api';

@Injectable()
export class GlobalsService {
    constructor(
        private store: Store<AppState>,
        private http: Http
    ) { }

    private populatePageInfo = (): void => {
        const id = $('a.dashboard').prop('href') ? Number($('a.dashboard').prop('href').match(/view\/(\d+)\/dashboard/)[1]) : 0;

        if (!id) {
            throw(new Error('Unable to get company info'));
        } else {
            const location = window.location.href.match(/view\/(\d+)(\/[a-zA-Z_]+)?(\/[a-zA-Z_]+)?/),
                unitList = location && (!location[2] || location[2] === '/unit_list'),
                datetime = $('.date_time').html(),
                payload: IGlobalsInfo = {
                    realm: CookiesUtils.getCookie('last_realm'),
                    date: datetime ? datetime.split('.')[0].trim() : null,
                    companyId: id,
                    isUnitListPage: unitList,
                    isNNSPage: unitList && location[3] === '/nns'
                };

            this.store.dispatch({ type: GlobalsActions.SET_INFO, payload: payload });
        }
    }

    private populateToken$ = (): Observable<any> => {
        return this.store.pipe(
            select(globals),
            first(),
            flatMap((g: IGlobalsState) => this.http.get(tokenUrl(g.info.realm))),
            map((response: Response) => this.store.dispatch({ type: GlobalsActions.SET_TOKEN, payload: response.json() }))
        );
    }

    public init$ = (): Observable<any> => {
        this.populatePageInfo();
        return this.populateToken$();
    }
}
