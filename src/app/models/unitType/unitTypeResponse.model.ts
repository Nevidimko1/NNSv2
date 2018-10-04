export class IUnitTypesResponseItem {
    id: string;
    industry_id: string;
    class_id: string;
    kind: string;
    name: string;
    industry_name: string;
    class_name: string;
    symbol: string;
    need_technology: string;
    labor_max: string;
    equipment_max: string;
    square: string;
    building_time: string;
}

export class IUnitTypesResponse {
    [key: string]: IUnitTypesResponseItem;
}
