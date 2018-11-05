import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Parser } from '../parser';
import { ICitiesResponse, ICityItemResponse } from 'src/app/models/geo/citiesResponse.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { cityItemData } from '../responses/cityItem.data';
import { City } from 'src/app/models/geo/city.model';

@Injectable()
export class CitiesParser extends Parser {
    protected error = 'Failed to parse Countries response';

    constructor() {
        super();
    }

    public parse$ = (response: ICitiesResponse): Observable<City[]> => {
        const data = CommonUtils.flatMap(response);
        this.diff(data[0], cityItemData);

        return of(data.map((responseItem: ICityItemResponse) => new City({
            id: Number(responseItem.id),
            regionId: Number(responseItem.region_id),
            countryId: Number(responseItem.country_id),
            regionName: responseItem.region_name,
            countryName: responseItem.country_name,
            level: Number(responseItem.level),
            population: Number(responseItem.population),
            ploughField: Number(responseItem.plough_field),
            salary: Number(responseItem.salary),
            unemployment: Number(responseItem.unemployment),
            education: Number(responseItem.education),
            x: Number(responseItem.x),
            y: Number(responseItem.y),
            status: Number(responseItem.status),
            wealthLevel: Number(responseItem.wealth_level),
            countrySymbol: responseItem.country_symbol,
            cityId: Number(responseItem.city_id),
            cityName: responseItem.city_name,
            noviceShield: Number(responseItem.novice_shield),
            restrictions: responseItem.restrictions,
            restrictionsCount: Number(responseItem.restrictions_count),
            retails: responseItem.retails,
            retailCount: Number(responseItem.retail_count),
            intellectualsCost: Number(responseItem.intellectuals_cost),
            merchantsCost: Number(responseItem.merchants_cost),
            workersCost: Number(responseItem.workers_cost),
            mayor: null
        })));
    }
}
