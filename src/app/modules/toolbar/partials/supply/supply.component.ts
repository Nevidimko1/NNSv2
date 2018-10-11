import { Component, Output, EventEmitter } from '@angular/core';

import { SectionComponent } from '../../common/section.component';
import { ISupplyStrategy } from '../../../../models/strategy/supplyStrategy.model';
import { SupplyStrategies, MinSupplies, MaxSupplyValues } from './supply.config';

@Component({
    selector: 'app-toolbar-supply',
    templateUrl: './supply.component.html',
    styleUrls: [
        '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../common/styles/card.less',
        './supply.component.less'
    ]
})
export class SupplyComponent extends SectionComponent {

    @Output() strategyChanged = new EventEmitter<ISupplyStrategy>();
    @Output() minChanged = new EventEmitter<number>();
    @Output() maxValueChanged = new EventEmitter<number>();

    protected strategies: ISupplyStrategy[] = SupplyStrategies;
    protected mins: number[] = MinSupplies;
    protected maxValues: number[] = MaxSupplyValues;

    private selectedStrategy: ISupplyStrategy;
    private selectedMin: number;
    private selectedMaxValue: number;

    constructor() {
        super();
    }

    onStrategyChange = () => this.strategyChanged.emit(this.selectedStrategy);
    onMinChange = () => this.minChanged.emit(this.selectedMin);
    onMaxValueChange = () => this.maxValueChanged.emit(this.selectedMaxValue);
}
