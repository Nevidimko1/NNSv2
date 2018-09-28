import { IBase } from './base.model';

export class IUnitsResponseDataItem {
    id: string;
    name: string;
    country_symbol: string;
    country_name: string;
    region_name: string;
    city_name: string;
    unit_type_id: string;
    unit_type_symbol: string;
    unit_type_name: string;
    size: string;
    labor_max: string;
    equipment_max: string;
    square: string;
    unit_type_produce_name: string;
    unit_class_id: string;
    unit_class_name: string;
    unit_class_kind: string;
    productivity: string;
    notice: string;
    product_ids: string;
    product_symbols: string;
    product_names: string;
    market_status: string;
    time_to_build: string;
    office_sort: string;
}

export class IUnitsResponseIndicator {
    id: string;
    kind: string;
    name: string;
}

export class IUnitsResponseIndicators {
    [indicatorId: string]: IUnitsResponseIndicator;
}

export class IUnitsResponseInfo {
    count: string;
    page: number;
    page_size: number;
}

export class IUnitsResponse {
    data: {
        [key: string]: IUnitsResponseDataItem
    };
    indicators: {
        [unitId: string]: IUnitsResponseIndicators;
    };
    info: any;
}

export interface IUnitIndicator extends IBase {
    id: number;
    kind: string;
    name: string;
}

export interface IUnitItemProduct extends IBase {
    symbol: string;
}

export interface IUnitItem extends IBase {
    countrySymbol: string;
    countryName: string;
    regionName: string;
    cityName: string;
    unitTypeId: number;
    unitTypeSymbol: string;
    unitTypeName: string;
    size: number;
    laborMax: number;
    equipmentMax: number;
    square: number;
    unitTypeProduceName: string;
    unitClassId: number;
    unitClassName: string;
    unitClassKind: string;
    productivity: number;
    notice: string;
    products: IUnitItemProduct[];
    marketStatus: string;
    timeToBuild: number;
    officeSort: number;

    indicators: IUnitIndicator[];
}
