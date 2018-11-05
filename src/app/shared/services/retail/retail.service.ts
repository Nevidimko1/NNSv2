import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { first, tap, flatMap } from 'rxjs/operators';

import { globals, AppState } from '../../appState';
import { ApiService } from '../api.service';
import { IRetailProductReportResponse } from 'src/app/models/retail/retailProductReportResponse.model';
import { productReportUrl } from '../../api';
import { UnitsListActions } from 'src/app/reducers/unitsList.reducer';
import { RetailProductReportParser } from '../../parsers/retail/retailProductReport.parser';
import { RetailProductReport } from 'src/app/models/retail/retailProductReport.model';
import { Unit } from 'src/app/models/unitInfo/unit.model';
import { GeoService } from '../geo.service';
import { IGlobalsState } from 'src/app/reducers/globals.reducer';

@Injectable()
export class RetailService {
    private productReportParser: RetailProductReportParser;

    constructor(
        protected store: Store<AppState>,
        protected apiService: ApiService,
        protected geoService: GeoService
    ) {
        this.productReportParser = new RetailProductReportParser();
    }

    protected fetchReport$ = (unit: Unit, productId: number): Observable<RetailProductReport> => {
        return forkJoin(
            this.store.select(globals).pipe(first()),
            this.geoService.generateGeoString$(unit)
        ).pipe(
            flatMap((result: [IGlobalsState, string]) => this.apiService.get<IRetailProductReportResponse>(
                productReportUrl(result[0].info.realm, productId, result[1])
            )),
            flatMap(response => this.productReportParser.parse(response)),
            tap(report => this.store.dispatch({ type: UnitsListActions.SET_PRODUCT_REPORT, payload: {
                unitId: unit.id,
                productId: productId,
                report
            }}))
        );
    }

    protected getReport$ = (unit: Unit, productId: number): Observable<RetailProductReport> => {
        return of(unit.products
            .filter(product => product.id === productId)[0].report
        ).pipe(
            flatMap(report => report ? of(report) : this.fetchReport$(unit, productId))
        );
    }
}
