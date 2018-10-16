import { IPriceStrategy } from '../../../models/strategy/priceStrategy.model';
import { INumericConfig } from 'src/app/models/strategy/numericConfig.model';

export class PriceState {
    strategy: IPriceStrategy;
    min: INumericConfig;
}
