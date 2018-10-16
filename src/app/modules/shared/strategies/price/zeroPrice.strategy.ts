import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { UnitProduct } from '../../../../models/unitInfo/unitProduct.model';
import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';

export class ZeroPriceStrategy implements IPriceStrategy {

    public readonly id = 'ZeroPriceStrategy';
    public readonly types = [UNIT_TYPES.SHOP, UNIT_TYPES.WAREHOUSE, UNIT_TYPES.WORKSHOP];
    public readonly name = '0';
    public readonly shortName = '0';

    constructor() { }

    public calc = (p: UnitProduct): number => {
        return 0;
    }
}
