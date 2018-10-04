import { Unit } from '../../models/unitInfo/unit.model';
import { CommonUtils } from '../../utils/common.utils';
import { Response } from '@angular/http';
import { Parser } from './parser';
import { IUnitsResponseItem, IUnitsResponse, IUnitsResponseIndicator } from '../../models/unitInfo/unitResponse.model';
import { UnitIndicator } from '../../models/unitInfo/unitIndicator.model';
import { UnitProduct } from '../../models/unitInfo/unitProduct.model';

export class UnitsListParser extends Parser {
    protected error = 'Failed to parse Units list response';

    constructor() {
        super();
    }

    private mapProducts = (responseItem: IUnitsResponseItem): UnitProduct[] => {
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

        if (ids.length !== product_symbols.length || ids.length !== product_names.length) {
            throw new Error('Failed to parse unit products list');
        }

        return ids.map((id, i) => {
            return new UnitProduct({
                id,
                symbol: product_symbols[i],
                name: product_names[i]
            });
        }) || [];
    }

    public parse = (response: Response): Unit[] => {
        const body = response.json();
        this.diff(body, IUnitsResponse);

        const data = CommonUtils.flatMap(body.data);
        this.diff(data[0], IUnitsResponseItem);

        return data.map((responseItem: IUnitsResponseItem) => new Unit({
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
            productivityTomorrow: null,
            notice: responseItem.notice,
            marketStatus: responseItem.market_status,
            timeToBuild: Number(responseItem.time_to_build),
            officeSort: Number(responseItem.office_sort),
            products: this.mapProducts(responseItem),
            indicators: Object.keys(body.indicators)
                .filter((key: string) => Number(responseItem.id) === Number(key))
                .map((key: string) => CommonUtils.flatMap(body.indicators[key])
                    .map((item: IUnitsResponseIndicator) => new UnitIndicator({
                        id: Number(item.id),
                        kind: item.kind,
                        name: item.name
                    }))
                )[0] || []
        }));
    }
}
