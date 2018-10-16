import { UnitProduct } from '../../../../models/unitInfo/unitProduct.model';
import { UNIT_TYPES } from '../../../../shared/unitTypes.enum';
import { ISupplyStrategy } from '../../../../models/strategy/supplyStrategy.model';

export class Sold3SupplyStrategy implements ISupplyStrategy {

    public readonly id = 'Sold3SupplyStrategy';
    public readonly types = [UNIT_TYPES.SHOP, UNIT_TYPES.WAREHOUSE, UNIT_TYPES.WORKSHOP];
    public readonly name = '300%';
    public readonly shortName = '300%';

    constructor() { }

    public calc = (p: UnitProduct): number => {
        return 3;
    }
}
