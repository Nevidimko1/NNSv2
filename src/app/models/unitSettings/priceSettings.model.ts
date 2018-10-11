import { IPriceStrategy } from '../strategy/priceStrategy.model';

export interface IPriceSettings {
    strategy: IPriceStrategy;
    minPrice: number;
}

export class PriceSettings {
    constructor(protected data: IPriceSettings) { }

    get strategy(): IPriceStrategy  { return this.data.strategy; }
    get minPrice(): number          { return this.data.minPrice; }
}
