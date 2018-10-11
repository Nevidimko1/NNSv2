import { ISupplyStrategy } from '../../../../models/strategy/supplyStrategy.model';
import { ZeroSupplyStrategy } from '../../common/strategies/supply/zeroSupply.strategy';
import { Sold2SupplyStrategy } from '../../common/strategies/supply/sold2Supply.strategy';
import { Sold3SupplyStrategy } from '../../common/strategies/supply/sold3Supply.strategy';

export const SupplyStrategies: ISupplyStrategy[] = [
    new ZeroSupplyStrategy(),
    new Sold2SupplyStrategy(),
    new Sold3SupplyStrategy()
];

export const MinSupplies: number[] = [ 0, 10 ];

export const MaxSupplyValues: number[] = [ 1000000, 10000000, 100000000, 1000000000, 10000000000 ];
