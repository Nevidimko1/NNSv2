import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, flatMap, first, tap, finalize } from 'rxjs/operators';

import { AppState, globals } from '../../appState';
import { ApiService } from '../api.service';
import { tradingHallUrl, productHistoryUrl } from '../../api';
import { RetailProduct } from 'src/app/models/retail/retailProduct.model';
import { RetailTradingHallParser } from '../../parsers/retail/retailTradingHall.parser';
import { RetailProductHistoryParser } from '../../parsers/retail/retailProductHistory.parser';
import { UnitsTableItem } from 'src/app/modules/unitsTable/models/unitsTableItem.model';
import { UNIT_TYPES } from '../../unitTypes.enum';
import { RetailService } from './retail.service';
import { GeoService } from '../geo.service';

@Injectable()
export class RetailPricesService extends RetailService {
    constructor(
        protected store: Store<AppState>,
        protected apiService: ApiService,
        protected geoService: GeoService,
        private tradingHallParser: RetailTradingHallParser,
        private productHistoryParser: RetailProductHistoryParser
    ) {
        super(store, apiService, geoService);
    }

    private getTradingHallData$ = (unit: UnitsTableItem): Observable<RetailProduct[]> => {
        return this.store.select(globals).pipe(
            first(),
            flatMap(state => this.apiService.get<string>(tradingHallUrl(state.info.realm, unit.id))),
            flatMap(html => this.tradingHallParser.parse(html))
        );
    }

    private populateHistories$ = (unit: UnitsTableItem, products: RetailProduct[]): Observable<RetailProduct[]> => {
        return this.store.select(globals).pipe(
            first(),
            flatMap(state => products.reduce((result, p) => result.pipe(
                flatMap(() => this.apiService.get<string>(productHistoryUrl(state.info.realm, unit.id, p.id))),
                flatMap(html => this.productHistoryParser.parse(html)),
                tap(history => p.history = history),
                finalize(() => [])
            ), of([]))),
            map(() => products)
        );
    }

    private populateReports$ = (unit: UnitsTableItem, products: RetailProduct[]): Observable<RetailProduct[]> => {
        return of([]).pipe(
            flatMap(state => products.reduce((result, p) => result.pipe(
                flatMap(() => this.getReport$(unit.info, p.id)),
                tap(report => p.report = report),
                finalize(() => [])
            ), of([]))),
            map(() => products)
        );
    }

    private sendPrices$ = (unit: UnitsTableItem, data: object): Observable<any> => {
        return this.store.select(globals).pipe(
            first(),
            flatMap(state => this.apiService.post(tradingHallUrl(state.info.realm, unit.id), { action: 'setprice', ...data }))
        );
    }

    private printChanges = (changes: object, products: RetailProduct[]): void => {
        const keys = Object.keys(changes);
        if (keys.length) {
            const data = keys.reduce((result, key) => {
                const product = products.filter(p => p.updateFieldName === key)[0];
                return {
                    ...result,
                    [product && product.report.name]: {
                        old: product && product.price,
                        new: changes[key]
                    }
                };
            }, {});
            console.table(data);
        } else {
            console.log(`No changes`);
        }
    }

    private setPrices$ = (unit: UnitsTableItem, products: RetailProduct[]): Observable<any> => {
        console.log(`Updating prices for ${unit.info.name}[${unit.id}]`);
        return of(products
            .map(product => Math.max(
                (unit.priceStrategy ? unit.priceStrategy.calc(product) : 0),
                Math.round(product.purch * (unit.priceMin ? unit.priceMin.value : 0))
            ))
            .reduce((result: object, price: number, i: number) => ({
                ...result,
                ...(price !== products[i].price) && { [products[i].updateFieldName]: price }
            }), {})
        ).pipe(
            tap(changes => this.printChanges(changes, products)),
            flatMap(changes => Object.keys(changes).length > 0 ? this.sendPrices$(unit, changes) : of([]))
        );
    }

    private update$ = (unit: UnitsTableItem): Observable<any> => {
        return of([]).pipe(
            flatMap(() => this.getTradingHallData$(unit)),
            flatMap(products => this.populateHistories$(unit, products)),
            flatMap(products => this.populateReports$(unit, products)),
            flatMap(products => this.setPrices$(unit, products))
        );
    }

    public checkAndUpdate$ = (unit: UnitsTableItem): Observable<any> => {
        return (unit.info.unitClassKind === UNIT_TYPES.SHOP) ? this.update$(unit) : of([]);
    }
}
