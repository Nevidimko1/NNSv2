import { ISupplyStrategy } from '../strategy/supplyStrategy.model';

export interface ISupplySettings {
    strategy: ISupplyStrategy;
    minItems: number;
    maxValue: number;
}

export class SupplySettings {
    constructor(protected data: ISupplySettings) { }

    get strategy(): ISupplyStrategy { return this.data.strategy; }
    get minItems(): number          { return this.data.minItems; }
    get maxValue(): number          { return this.data.maxValue; }
}
