import { IPriceStrategy } from '../../../../models/strategy/priceStrategy.model';
import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';
import { SharedPriceStrategy } from './sharedPrice.strategy';
import { RetailProduct } from 'src/app/models/retail/retailProduct.model';

export class Market10pPriceStrategy extends SharedPriceStrategy implements IPriceStrategy {

    public readonly id = 'Market10pPriceStrategy';
    public readonly types = [UNIT_TYPES.SHOP];
    public readonly name = 'Market 10%';
    public readonly shortName = 'M10';

    constructor() {
        super();
    }

    public calc = (p: RetailProduct): number => this.calcShared(p, 10);
}
