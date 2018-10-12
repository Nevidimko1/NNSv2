import { Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { PriceStrategies, MinPrices } from './price.config';
import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { SectionComponent } from '../../common/section.component';
import { INumericConfig } from 'src/app/models/strategy/numericConfig.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { UnitsTableItem } from 'src/app/modules/unitsTable/models/unitsTableItem.model';

@Component({
    selector: 'app-toolbar-price',
    templateUrl: './price.component.html',
    styleUrls: [
        '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../common/styles/card.less'
    ]
})
export class PriceComponent extends SectionComponent implements OnChanges {

    @Output() strategyChanged = new EventEmitter<IPriceStrategy>();
    @Output() minChanged = new EventEmitter<INumericConfig>();

    protected strategies: IPriceStrategy[] = PriceStrategies;
    protected mins: INumericConfig[] = MinPrices;

    private selectedStrategy: IPriceStrategy;
    private selectedMin: INumericConfig;

    constructor() {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        const states = (changes.selectedUnits.currentValue as UnitsTableItem[]).map(state => state.priceState),
            strategies = CommonUtils.uniqueValues<IPriceStrategy>(states, 'strategy'),
            mins = CommonUtils.uniqueValues<INumericConfig>(states, 'min');

        this.selectedStrategy = strategies.length === 1 ? strategies[0] : null;
        this.selectedMin = mins.length === 1 ? mins[0] : null;
    }

    onStrategyChange = () => this.strategyChanged.emit(this.selectedStrategy);
    onMinChange = () => this.minChanged.emit(this.selectedMin);
}
