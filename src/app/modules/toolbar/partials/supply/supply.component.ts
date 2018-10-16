import { Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { SectionComponent } from '../../common/section.component';
import { ISupplyStrategy } from '../../../../models/strategy/supplyStrategy.model';
import { SupplyStrategies, MinSupplies, MaxSupplyValues } from '../../../shared/configs/supply.config';
import { INumericConfig } from 'src/app/models/strategy/numericConfig.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { UnitsTableItem } from 'src/app/modules/unitsTable/models/unitsTableItem.model';

@Component({
    selector: 'app-toolbar-supply',
    templateUrl: './supply.component.html',
    styleUrls: [
        '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../common/styles/card.less'
    ]
})
export class SupplyComponent extends SectionComponent implements OnChanges {

    @Output() strategyChanged = new EventEmitter<ISupplyStrategy>();
    @Output() minChanged = new EventEmitter<INumericConfig>();
    @Output() maxValueChanged = new EventEmitter<INumericConfig>();

    protected strategies: ISupplyStrategy[] = SupplyStrategies;
    protected mins: INumericConfig[] = MinSupplies;
    protected maxValues: INumericConfig[] = MaxSupplyValues;

    private selectedStrategy: ISupplyStrategy;
    private selectedMin: INumericConfig;
    private selectedMaxValue: INumericConfig;

    constructor() {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        const states = (changes.selectedUnits.currentValue as UnitsTableItem[]).map(state => state.supplyState),
            strategies = CommonUtils.uniqueValues<ISupplyStrategy>(states, 'strategy'),
            mins = CommonUtils.uniqueValues<INumericConfig>(states, 'min'),
            maxValues = CommonUtils.uniqueValues<INumericConfig>(states, 'maxValue');

        this.selectedStrategy = strategies.length === 1 ? strategies[0] : null;
        this.selectedMin = mins.length === 1 ? mins[0] : null;
        this.selectedMaxValue = maxValues.length === 1 ? maxValues[0] : null;
    }

    onStrategyChange = () => this.strategyChanged.emit(this.selectedStrategy);
    onMinChange = () => this.minChanged.emit(this.selectedMin);
    onMaxValueChange = () => this.maxValueChanged.emit(this.selectedMaxValue);
}
