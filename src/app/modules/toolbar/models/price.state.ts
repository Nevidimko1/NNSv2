import { IPriceStrategy } from '../../../models/strategy/priceStrategy.model';

export class PriceState {
    strategy: IPriceStrategy;
    min: number;
}
