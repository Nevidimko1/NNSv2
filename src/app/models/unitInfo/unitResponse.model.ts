export class IUnitsResponseItem {
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
        [key: string]: IUnitsResponseItem
    };
    indicators: {
        [unitId: string]: IUnitsResponseIndicators;
    };
    info: any;
}
