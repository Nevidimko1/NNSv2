import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UnitsListService } from './shared/services/unitsList.service';
import { UnitsTypesService } from './shared/services/unitsTypes.service';
import { GeoService } from './shared/services/geo.service';
import { UnitsTypesParser } from './shared/parsers/unitsTypes.parser';
import { UnitsListParser } from './shared/parsers/unitsList.parser';
import { CitiesParser } from './shared/parsers/geo/cities.parser';

@Component({
    selector: 'app-root',
    template: `
        <app-control-panel></app-control-panel>
        <app-units-table class="d-flex flex-column"></app-units-table>
    `,
    styles: [`
        :host {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UnitsListService,
        UnitsTypesService,
        GeoService,

        UnitsListParser,
        UnitsTypesParser,
        CitiesParser
    ]
})
export class AppComponent {
    constructor(
        private unitsListService: UnitsListService,
        private unitsTypesService: UnitsTypesService,
        private geoService: GeoService
    ) {
        this.unitsListService.fetchUnitsList$().subscribe();
        this.unitsTypesService.fetchUnitTypesList$().subscribe();
        this.geoService.fetchGeoInfo$().subscribe();
    }
}
