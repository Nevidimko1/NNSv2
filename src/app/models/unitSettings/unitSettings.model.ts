import { PriceSettings } from './priceSettings.model';
import { SupplySettings } from './supplySettings.model';

export interface IUnitSettings {
    price: PriceSettings;
    supply: SupplySettings;
}

export class UnitSettings {
    constructor(protected data: IUnitSettings) { }

    get price(): PriceSettings      { return this.data.price; }
    get supply(): SupplySettings    { return this.data.supply; }
}
