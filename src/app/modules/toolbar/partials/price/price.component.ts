import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, price } from '../../../../shared/appState';
import { SectionComponent } from '../../common/section.component';
import { PriceState, PriceActions } from './price.reducer';

@Component({
    selector: 'app-toolbar-price',
    templateUrl: './price.component.html',
    styleUrls: [
        '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../common/styles/card.less',
        './price.component.less'
    ]
})
export class PriceComponent extends SectionComponent implements OnInit, OnDestroy {
    @Input() enabled: Observable<boolean>;

    protected state$: Observable<PriceState>;

    private enabledSubscription: Subscription;

    constructor(
        protected store: Store<AppState>
    ) {
        super(store, PriceActions);
        this.state$ = this.store.pipe(select(price));
    }

    ngOnInit() {
        this.enabled.pipe(
            map((enabled: boolean) => this.store.dispatch({ type: PriceActions.UPDATE_ENABLED, payload: enabled }))
        ).subscribe();
    }

    ngOnDestroy() {
        this.enabledSubscription.unsubscribe();
    }
}
