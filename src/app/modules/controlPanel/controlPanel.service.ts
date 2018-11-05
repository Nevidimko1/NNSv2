import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { flatMap, finalize } from 'rxjs/operators';

import { Unit } from 'src/app/models/unitInfo/unit.model';
import { AppState } from 'src/app/shared/appState';
import { ApiService } from 'src/app/shared/services/api.service';
import { UnitsTableActions } from '../unitsTable/unitsTable.reducer';
import { ControlPanelActions } from './controlPanel.reducer';
import { RetailPricesService } from 'src/app/shared/services/retail/retailPrices.service';
import { UnitsTableItem } from '../unitsTable/models/unitsTableItem.model';
import { UnitInfoService } from 'src/app/shared/services/unitInfo.service';
import { RetailSupplyService } from 'src/app/shared/services/retail/retailSupply.service';

@Injectable()
export class ControlPanelService {
    constructor(
        private store: Store<AppState>,
        private apiService: ApiService,
        private unitInfoService: UnitInfoService,
        private retailPricesService: RetailPricesService,
        private retailSupplyService: RetailSupplyService
    ) { }

    get ajax$() {
        return this.apiService.ajax$;
    }

    public updateUnits$ = (units: Unit[]): Observable<any> => {
        this.store.dispatch({ type: ControlPanelActions.START_UPDATE });
        return units.reduce((result: Observable<any>, unit: Unit) => {
            this.store.dispatch({ type: UnitsTableActions.UPDATE_PROGRESS, payload: { id: unit.id, inProgress: true }});
            return result.pipe(
                flatMap(() => this.unitInfoService.update$(unit)),
                finalize(() => {
                    this.store.dispatch({ type: UnitsTableActions.UPDATE_PROGRESS, payload: { id: unit.id, inProgress: false }});
                    this.store.dispatch({ type: ControlPanelActions.INCREMENT_CURRENT_PROGRESS });
                })
            );
        }, of([])).pipe(
            finalize(() => this.store.dispatch({ type: ControlPanelActions.STOP_UPDATE }))
        );
    }

    public runUnits$ = (units: UnitsTableItem[]): Observable<any> => {
        this.store.dispatch({ type: ControlPanelActions.START_RUN });
        return units.reduce((result: Observable<any>, unit: UnitsTableItem) => {
            this.store.dispatch({ type: UnitsTableActions.UPDATE_PROGRESS, payload: { id: unit.id, inProgress: true } });
            return result.pipe(
                flatMap(() => this.retailPricesService.checkAndUpdate$(unit.id, unit.info.unitClassKind)),
                flatMap(() => this.retailSupplyService.checkAndUpdate$(unit.id, unit.info.unitClassKind)),
                finalize(() => {
                    this.store.dispatch({ type: UnitsTableActions.UPDATE_PROGRESS, payload: { id: unit.id, inProgress: false } });
                    this.store.dispatch({ type: ControlPanelActions.INCREMENT_CURRENT_PROGRESS });
                })
            );
        }, of([])).pipe(
            finalize(() => this.store.dispatch({ type: ControlPanelActions.STOP_RUN }))
        );
    }
}
