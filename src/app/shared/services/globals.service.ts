import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as $ from 'jquery';

import { CookiesUtils } from '../../utils/cookies.utils';
import { AppState } from '../appState';
import { GlobalsActions } from '../../reducers/GlobalsReducer';
import { IGlobalsInfo } from '../../models/globals.model';

@Injectable()
export class GlobalsService {
    constructor(
        private store: Store<AppState>
    ) { }

    public init$ = (): Observable<any> => {
        return new Observable(() => {
            const id = $('a.dashboard').prop('href') ? Number($('a.dashboard').prop('href').match(/view\/(\d+)\/dashboard/)[1]) : 0;

            if (!id) {
                Observable.throw('Unable to get company info');
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
                return;
            }
        });

    }
}
