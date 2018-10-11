import { Component, Output, EventEmitter } from '@angular/core';

import { PriceStrategies, MinPrices } from './price.config';
import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { SectionComponent } from '../../common/section.component';

@Component({
    selector: 'app-toolbar-price',
    templateUrl: './price.component.html',
    styleUrls: [
        '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../common/styles/card.less',
        './price.component.less'
    ]
})
export class PriceComponent extends SectionComponent {

    @Output() strategyChanged = new EventEmitter<IPriceStrategy>();
    @Output() minChanged = new EventEmitter<number>();

    protected strategies: IPriceStrategy[] = PriceStrategies;
    protected mins: number[] = MinPrices;

    private selectedStrategy: IPriceStrategy;
    private selectedMin: number;

    constructor() {
        super();
    }

    onStrategyChange = () => this.strategyChanged.emit(this.selectedStrategy);
    onMinChange = () => this.minChanged.emit(this.selectedMin);
}
