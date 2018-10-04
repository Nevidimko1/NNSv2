import { Component } from '@angular/core';
import { UnitsListService } from './shared/services/unitsList.service';
import { UnitsTypesService } from './shared/services/unitsTypes.service';

@Component({
    selector: 'app-root',
    template: `
        <app-units-table class="d-flex flex-column"></app-units-table>
    `,
    styles: [`
        :host {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
    `]
})
export class AppComponent {
    constructor(
        private unitsListService: UnitsListService,
        private unitsTypesService: UnitsTypesService
    ) {
        this.unitsListService.fetchUnitsList$().subscribe();
        this.unitsTypesService.fetchUnitTypesList$().subscribe();
    }
}
