import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { ZeroPriceStrategy } from '../../common/strategies/price/zeroPrice.strategy';
import { Market10pPriceStrategy } from '../../common/strategies/price/market10pPrice.strategy';
import { Market20pPriceStrategy } from '../../common/strategies/price/market20pPrice.strategy';

export const PriceStrategies: IPriceStrategy[] = [
    new ZeroPriceStrategy(),
    new Market10pPriceStrategy(),
    new Market20pPriceStrategy()
];

export const MinPrices: number[] = [ 0, 1, 1.1, 1.4, 1.5, 2 ];
