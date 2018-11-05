import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, flatMap, first, tap } from 'rxjs/operators';

import { AppState, globals, cities } from '../appState';
import { citiesUrl } from '../api';
import { ApiService } from './api.service';
import { ICitiesResponse } from 'src/app/models/geo/citiesResponse.model';
import { CitiesParser } from '../parsers/geo/cities.parser';
import { CitiesActions } from 'src/app/reducers/cities.reducer';
import { Unit } from 'src/app/models/unitInfo/unit.model';

@Injectable()
export class GeoService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private citiesParser: CitiesParser
    ) { }

    private fetchCities$ = (): Observable<any> => {
        return this.store.select(globals).pipe(
            first(),
            flatMap(state => this.apiService.get<ICitiesResponse>(citiesUrl(state.info.realm))),
            flatMap(response => this.citiesParser.parse$(response)),
            tap(data => this.store.dispatch({ type: CitiesActions.INIT, payload: data }))
        );
    }

    public fetchGeoInfo$ = (): Observable<any> => {
        return of([]).pipe(
            flatMap(() => this.fetchCities$())
        );
    }

    public generateGeoString$ = (unit: Unit): Observable<string> => {
        return this.store.select(cities).pipe(
            first(),
            map(state => state.values.filter(city => city.cityName === unit.cityName)[0]),
            map(city => `${city.countryId}/${city.regionId}/${city.cityId}`)
        );
    }
}
