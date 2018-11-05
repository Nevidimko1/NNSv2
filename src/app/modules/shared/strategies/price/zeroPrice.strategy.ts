import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';
import { RetailProduct } from 'src/app/models/retail/retailProduct.model';

export class ZeroPriceStrategy implements IPriceStrategy {

    public readonly id = 'ZeroPriceStrategy';
    public readonly types = [UNIT_TYPES.SHOP, UNIT_TYPES.WAREHOUSE, UNIT_TYPES.WORKSHOP];
    public readonly name = '0';
    public readonly shortName = '0';

    constructor() { }

    public calc = (p: RetailProduct): number => {
        return 0;
    }
}
