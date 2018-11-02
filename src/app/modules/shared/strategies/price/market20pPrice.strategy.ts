import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';
import { SharedPriceStrategy } from './sharedPrice.strategy';
import { RetailProduct } from 'src/app/models/retail/retailProduct.model';

export class Market20pPriceStrategy extends SharedPriceStrategy implements IPriceStrategy {

    public readonly id = 'Market20pPriceStrategy';
    public readonly types = [UNIT_TYPES.SHOP];
    public readonly name = 'Market 20%';
    public readonly shortName = 'M20';

    constructor() {
        super();
    }

    public calc = (p: RetailProduct): number => this.calcShared(p, 20);
}
