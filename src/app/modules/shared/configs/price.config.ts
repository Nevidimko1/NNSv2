import { IPriceStrategy } from '../../../models/strategy/priceStrategy.model';
import { ZeroPriceStrategy } from '../strategies/price/zeroPrice.strategy';
import { Market10pPriceStrategy } from '../strategies/price/market10pPrice.strategy';
import { Market20pPriceStrategy } from '../strategies/price/market20pPrice.strategy';
import { INumericConfig } from 'src/app/models/strategy/numericConfig.model';

export const PriceStrategies: IPriceStrategy[] = [
    new ZeroPriceStrategy(),
    new Market10pPriceStrategy(),
    new Market20pPriceStrategy()
];

export const MinPrices: INumericConfig[] = [
    { name: '0', shortName: '0', value: 0 },
    { name: '1', shortName: '1', value: 1 },
    { name: '1.1', shortName: '1.1', value: 1.1 },
    { name: '1.4', shortName: '1.4', value: 1.4 },
    { name: '1.5', shortName: '1.5', value: 1.5 },
    { name: '2', shortName: '2', value: 2 },
];
