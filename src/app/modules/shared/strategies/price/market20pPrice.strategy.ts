import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { UnitProduct } from '../../../../models/unitInfo/unitProduct.model';
import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';
import { SharedPriceStrategy } from './sharedPrice.strategy';

export class Market20pPriceStrategy extends SharedPriceStrategy implements IPriceStrategy {

    public readonly id = 'Market20pPriceStrategy';
    public readonly types = [UNIT_TYPES.SHOP];
    public readonly name = 'Market 20%';
    public readonly shortName = '20%';

    constructor() {
        super();
    }

    public calc = (p: UnitProduct): number => {
        return 20;
    }
}
