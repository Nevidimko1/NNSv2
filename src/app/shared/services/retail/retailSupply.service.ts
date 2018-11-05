import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, flatMap, first } from 'rxjs/operators';

import { AppState, unitsTable } from '../../appState';
import { UnitsTableItem } from 'src/app/modules/unitsTable/models/unitsTableItem.model';
import { UNIT_TYPES } from '../../unitTypes.enum';
import { RetailService } from './retail.service';
import { ApiService } from '../api.service';
import { GeoService } from '../geo.service';

@Injectable()
export class RetailSupplyService extends RetailService {
    constructor(
        protected store: Store<AppState>,
        protected apiService: ApiService,
        protected geoService: GeoService
    ) {
        super(store, apiService, geoService);
    }

    private check$ = (unit: UnitsTableItem): any => {
        if (unit.info.products) {
            return of([]);
        } else {
            return of([]); // this.populateReports$(unit, []);
        }
    }

    private update$ = (unitId: number): Observable<any> => {
        return this.store.select(unitsTable).pipe(
            first(),
            map(state => state.values.filter(u => u.id === unitId)[0]),
            map(unit => this.check$(unit))
        );
    }

    public checkAndUpdate$ = (unit: UnitsTableItem): Observable<any> => {
        return (unit.info.unitClassKind === UNIT_TYPES.SHOP) ? this.update$(unit.id) : of([]);
    }
}
