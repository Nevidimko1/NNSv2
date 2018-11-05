import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';
import { ISupplyStrategy } from '../../../../models/strategy/supplyStrategy.model';
import { RetailSupplyProduct } from 'src/app/models/retail/retailSupplyProduct.model';

export class Sold3SupplyStrategy implements ISupplyStrategy {

    public readonly id = 'Sold3SupplyStrategy';
    public readonly types = [UNIT_TYPES.SHOP, UNIT_TYPES.WAREHOUSE, UNIT_TYPES.WORKSHOP];
    public readonly name = '300%';
    public readonly shortName = '300%';

    constructor() { }

    public calc = (p: RetailSupplyProduct): number => {
        // order 5% of cityShare for very first p
        if (p.sold === 0 &&
            p.purchase === 0 &&
            p.stock === 0) {
            return Math.floor(p.report.localMarketSize * 0.05);
        }

        // Next day after supply change. Keep the quantity
        if (p.purchase === p.stock &&
            p.purchase > 0 &&
            p.sold * 3 <= p.purchase) {
            return p.purchase;
        }

        // sold * 3, because we expect to sell at least same amount on day change
        // and tomorrow we'll have twice more than we sold today
        return Math.max(0, p.sold * 4 - p.stock);
    }
}
