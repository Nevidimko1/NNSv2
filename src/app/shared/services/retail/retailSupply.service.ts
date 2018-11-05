import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, flatMap, first, tap, finalize, catchError } from 'rxjs/operators';

import { AppState, unitsTable, globals } from '../../appState';
import { UnitsTableItem } from 'src/app/modules/unitsTable/models/unitsTableItem.model';
import { UNIT_TYPES } from '../../unitTypes.enum';
import { RetailService } from './retail.service';
import { ApiService } from '../api.service';
import { GeoService } from '../geo.service';
import { supplyUrl, updateSupplyUrl } from '../../api';
import { RetailSupplyParser } from '../../parsers/retail/retailSupply.parser';
import { RetailSupplyProduct } from 'src/app/models/retail/retailSupplyProduct.model';
import { Unit } from 'src/app/models/unitInfo/unit.model';

export interface RetailSupplyChange {
    amount: number;
    offer: number;
    unit: number;
    priceConstraint: number;
    priceMarkUp: number;
    qualityMin: number;
    constraintPriceType: string;
}

@Injectable()
export class RetailSupplyService extends RetailService {
    private supplyParser: RetailSupplyParser;

    constructor(
        protected store: Store<AppState>,
        protected apiService: ApiService,
        protected geoService: GeoService
    ) {
        super(store, apiService, geoService);

        this.supplyParser = new RetailSupplyParser();
    }

    private addProductId = (unit: Unit, product: RetailSupplyProduct): RetailSupplyProduct => {
        const ex = unit.products.filter(p => p.symbol === product.symbol)[0];
        if (ex) {
            product.id = ex.id;
        }
        return product;
    }

    private validate = (unit: Unit, products: RetailSupplyProduct[]): Observable<RetailSupplyProduct[]> => {
        if (products.length === unit.products.length) {
            return of(products);
        }
        return this.store.select(globals).pipe(
            map(state => {
                throw new Error(`Missing a supplier, or has too many suppliers!\n${
                    window.location.origin + supplyUrl(state.info.realm, unit.id)}\n`);
            }),
            map(() => products)
        );
    }

    private getSupplyData$ = (unit: UnitsTableItem): Observable<RetailSupplyProduct[]> => {
        return this.store.select(globals).pipe(
            first(),
            flatMap(state => this.apiService.get<string>(supplyUrl(state.info.realm, unit.id))),
            flatMap(html => this.supplyParser.parse(html)),
            flatMap(products => this.validate(unit.info, products)),
            tap(products => products.forEach(product => this.addProductId(unit.info, product))),
        );
    }

    private populateReports$ = (unit: UnitsTableItem, products: RetailSupplyProduct[]): Observable<RetailSupplyProduct[]> => {
        return of([]).pipe(
            flatMap(() => products.reduce((result, p) => result.pipe(
                flatMap(() => this.getReport$(unit.info, p.id)),
                tap(report => p.report = report),
                finalize(() => [])
            ), of([]))),
            map(() => products)
        );
    }

    private sendSupplies$ = (changes: RetailSupplyChange[]): Observable<any> => {
        return this.store.select(globals).pipe(
            first(),
            flatMap(state => changes.reduce((result, change) => result.pipe(
                flatMap(() => this.apiService.post(updateSupplyUrl(state.info.realm), change))
            ), of([])))
        );
    }

    private printChanges = (changes: RetailSupplyChange[], products: RetailSupplyProduct[]): void => {
        if (changes.length) {
            const data = products.reduce((result, product) => {
                const change = changes.filter(c => c.offer === product.offer)[0];
                return change ? {
                    ...result,
                    [product && product.report.name]: {
                        old: product && product.parcel,
                        new: change && change.amount
                    }
                } : result;
            }, {});
            console.table(data);
        } else {
            console.log(`No changes`);
        }
    }

    private setSupplies$ = (unit: UnitsTableItem, products: RetailSupplyProduct[]): Observable<any> => {
        console.log(`Updating supplies for ${unit.info.name}[${unit.id}]`);
        return of(products
            .map(product => Math.max(
                (unit.supplyStrategy ? unit.supplyStrategy.calc(product) : 0),
                (unit.supplyMin ? unit.supplyMin.value : 0)
            ))
            .map((quantity: number, i: number) => {
                if (products[i].parcel !== quantity || products[i].reprice) {
                    return <RetailSupplyChange>{
                        amount: quantity,
                        offer: products[i].offer,
                        unit: unit.id,
                        priceConstraint: products[i].priceConstraintMax,
                        priceMarkUp: products[i].priceMarkUp,
                        qualityMin: products[i].qualityConstraintMin,
                        constraintPriceType: products[i].priceConstraintType
                    };
                } else {
                    return null;
                }
            })
            .filter(change => !!change)
        ).pipe(
            tap(changes => this.printChanges(changes, products)),
            flatMap(changes => changes.length > 0 ? this.sendSupplies$(changes) : of([]))
        );
    }

    private update$ = (unit: UnitsTableItem): Observable<any> => {
        return of([]).pipe(
            flatMap(() => this.getSupplyData$(unit)),
            flatMap(products => this.populateReports$(unit, products)),
            flatMap(products => this.setSupplies$(unit, products))
        );
    }

    public checkAndUpdate$ = (unitId: number, unitType: string): Observable<any> => {
        if (unitType !== UNIT_TYPES.SHOP) {
            return of([]);
        } else {
            return this.store.select(unitsTable).pipe(
                first(),
                map(state => state.values.filter(u => u.id === unitId)[0]),
                flatMap(unit => this.update$(unit)),
                catchError(e => {
                    console.error(e);
                    return of([]);
                })
            );
        }
    }
}
