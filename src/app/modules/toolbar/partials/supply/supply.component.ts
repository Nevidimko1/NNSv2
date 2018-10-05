import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, supply } from '../../../../shared/appState';
import { SectionComponent } from '../../common/section.component';
import { SupplyState, SupplyActions } from './supply.reducer';

@Component({
    selector: 'app-toolbar-supply',
    templateUrl: './supply.component.html',
    styleUrls: [
        '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../common/styles/card.less',
        './supply.component.less'
    ]
})
export class SupplyComponent extends SectionComponent implements OnInit, OnDestroy {
    @Input() enabled: Observable<boolean>;

    protected state$: Observable<SupplyState>;

    private enabledSubscription: Subscription;

    constructor(
        protected store: Store<AppState>
    ) {
        super(store, SupplyActions);
        this.state$ = this.store.pipe(select(supply));
    }

    ngOnInit() {
        this.enabled.pipe(
            map((enabled: boolean) => this.store.dispatch({ type: SupplyActions.UPDATE_ENABLED, payload: enabled }))
        ).subscribe();
    }

    ngOnDestroy() {
        this.enabledSubscription.unsubscribe();
    }
}
