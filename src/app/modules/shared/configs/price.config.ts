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
    { name: '100%', shortName: '100%', value: 1 },
    { name: '110%', shortName: '110%', value: 1.1 },
    { name: '140%', shortName: '140%', value: 1.4 },
    { name: '150%', shortName: '150%', value: 1.5 },
    { name: '200%', shortName: '200%', value: 2 },
];
