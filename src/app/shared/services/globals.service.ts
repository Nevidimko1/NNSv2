import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as $ from 'jquery';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookiesUtils } from '../../utils/cookies.utils';
import { AppState } from '../appState';
import { GlobalsActions } from '../../reducers/GlobalsReducer';
import { IGlobalsInfo } from '../../models/globals.model';
import { Http, Response } from '@angular/http';
import { tokenUrl, unitTypesListUrl, unitListUrl } from '../api';
import { IUnitType, IUnitTypesResponseItem } from '../../models/unitType.model';
import { CommonUtils } from '../../utils/common.utils';
import { IUnitItem, IUnitsResponseDataItem, IUnitItemProduct, IUnitsResponseIndicator } from '../../models/unitInfo.model';

@Injectable()
export class GlobalsService {
    constructor(
        private store: Store<AppState>,
        private http: Http
    ) { }

    private mapProducts = (responseItem: IUnitsResponseDataItem): IUnitItemProduct[] => {
        const idsString = (responseItem.product_ids || '{}'),
            ids = idsString
                .slice(1, idsString.length - 1)
                .split(',')
                .map(stringId => Number(stringId)),
            symbolsString = (responseItem.product_symbols || '{}'),
            product_symbols = symbolsString
                .slice(1, symbolsString.length - 1)
                .replace(/"/g, '')
                .split(','),
            namesString = (responseItem.product_names || ''),
            product_names = namesString
                .slice(1, namesString.length - 1)
                .replace(/"/g, '')
                .split(',');

        return ids.map((id, i) => {
            return {
                id,
                symbol: product_symbols[i],
                name: product_names[i]
            };
        }) || [];
    }

    private parseUnitTypesResponse = (response: Response): IUnitType[] => {
        return CommonUtils.flatMap(response.json())
            .map((responseItem: IUnitTypesResponseItem) => ({
                ...responseItem,
                id: Number(responseItem.id),
                industry_id: Number(responseItem.industry_id),
                class_id: Number(responseItem.class_id),
                need_technology: responseItem.need_technology === 't',
                labor_max: Number(responseItem.labor_max),
                equipment_max: Number(responseItem.equipment_max),
                square: Number(responseItem.square),
                building_time: Number(responseItem.building_time)
            }));
    }

    private parseUnitsResponse = (response: Response): IUnitItem[] => {
        const body = response.json();
        return CommonUtils.flatMap(body.data)
            .map((responseItem: IUnitsResponseDataItem) => {
                return {
                    id: Number(responseItem.id),
                    name: responseItem.name,
                    countrySymbol: responseItem.country_symbol,
                    countryName: responseItem.country_name,
                    regionName: responseItem.region_name,
                    cityName: responseItem.city_name,
                    unitTypeId: Number(responseItem.unit_type_id),
                    unitTypeSymbol: responseItem.unit_type_symbol,
                    unitTypeName: responseItem.unit_type_name,
                    size: Number(responseItem.size),
                    laborMax: Number(responseItem.labor_max),
                    equipmentMax: Number(responseItem.equipment_max),
                    square: Number(responseItem.square),
                    unitTypeProduceName: responseItem.unit_type_produce_name,
                    unitClassId: Number(responseItem.unit_class_id),
                    unitClassName: responseItem.unit_class_name,
                    unitClassKind: responseItem.unit_class_kind,
                    productivity: Number(responseItem.productivity),
                    notice: responseItem.notice,
                    marketStatus: responseItem.market_status,
                    timeToBuild: Number(responseItem.time_to_build),
                    officeSort: Number(responseItem.office_sort),
                    products: this.mapProducts(responseItem),
                    indicators: Object.keys(body.indicators)
                        .filter((key: string) => Number(responseItem.id) === Number(key))
                        .map((key: string) => CommonUtils.flatMap(body.indicators[key])
                            .map((item: IUnitsResponseIndicator) => ({
                                id: Number(item.id),
                                kind: item.kind,
                                name: item.name
                            }))
                        )[0] || []
                };
            });
    }

    private populatePageInfo = (): IGlobalsInfo => {
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
            return payload;
        }
    }

    private populateToken$ = (realm: string): Observable<any> => {
        return this.http.get(tokenUrl(realm)).pipe(
            map((response: Response) => {
                this.store.dispatch({ type: GlobalsActions.SET_TOKEN, payload: response.json() });
            })
        );
    }

    private fetchUnitTypesList$ = (realm: string): Observable<any> => {
        return this.http.get(unitTypesListUrl(realm)).pipe(
            map((response: Response) => this.store.dispatch({
                type: GlobalsActions.SET_UNIT_TYPES,
                payload: this.parseUnitTypesResponse(response)
            }))
        );
    }

    public fetchUnitsList$ = (realm: string, companyId: number): Observable<any> => {
        return this.http.get(unitListUrl(realm, companyId)).pipe(
            map((response: Response) => this.store.dispatch({
                type: GlobalsActions.SET_UNIT_LIST,
                payload: this.parseUnitsResponse(response)
            }))
        );
    }

    public init$ = (): Observable<any> => {
        const info = this.populatePageInfo();
        return zip(
            this.populateToken$(info.realm),
            this.fetchUnitTypesList$(info.realm),
            this.fetchUnitsList$(info.realm, info.companyId)
        );
    }
}
