export interface ICityItemResponse {
    id: string;
    region_id: string;
    country_id: string;
    region_name: string;
    country_name: string;
    level: string;
    population: string;
    plough_field: string;
    salary: string;
    unemployment: string;
    education: string;
    x: string;
    y: string;
    status: string;
    wealth_level: string;
    country_symbol: string;
    city_id: string;
    city_name: string;
    novice_shield: string;
    restrictions: string;
    restrictions_count: string;
    retails: string;
    retail_count: string;
    intellectuals_cost: string;
    merchants_cost: string;
    workers_cost: string;
    mayor: any;
}

export class ICitiesResponse {
    [key: string]: ICityItemResponse;
}
