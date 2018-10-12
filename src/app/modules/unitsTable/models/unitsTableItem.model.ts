import { Unit } from '../../../models/unitInfo/unit.model';
import { UnitIndicator } from '../../../models/unitInfo/unitIndicator.model';
import { PriceState } from '../../toolbar/models/price.state';
import { SupplyState } from '../../toolbar/models/supply.state';

export class UnitsTableItem {
    private _info: Unit;
    private _productivityDisplay: string;
    private _productivityTomorrowDisplay: string;
    private _priceState: PriceState;
    private _supplyState: SupplyState;

    constructor(info: Unit) {
        this._info = info;
        this._productivityDisplay = Math.floor(this._info.productivity * 100) + '%';
        this._productivityTomorrowDisplay = this._info.productivityTomorrow != null ?
            Math.floor(this._info.productivityTomorrow * 100) + '%' : '?';

        this._priceState = new PriceState();
        this._supplyState = new SupplyState();
    }

    get id(): number                            { return this._info.id; }
    get name(): string                          { return this._info.name; }
    get type(): string                          { return this._info.unitTypeSymbol; }
    get typeName(): string                      { return this._info.unitTypeName; }
    get countrySymbol(): string                 { return this._info.countrySymbol; }
    get countryName(): string                   { return this._info.countryName; }
    get cityName(): string                      { return this._info.cityName; }
    get indicators(): UnitIndicator[]           { return this._info.indicators; }
    get productivity(): number                  { return this._info.productivity; }
    get productivityDisplay(): string           { return this._productivityDisplay; }
    get productivityTomorrow(): number          { return this._info.productivityTomorrow; }
    get productivityTomorrowDisplay(): string   { return this._productivityTomorrowDisplay; }
    get size(): number                          { return this._info.size; }
    get url(): string                           { return this._info.url; }

    get priceState(): PriceState                { return this._priceState; }
    get supplyState(): SupplyState              { return this._supplyState; }

    get priceStrategy(): string                 { return this._priceState.strategy ? this._priceState.strategy.shortName : ''; }
    get priceMinDisplay(): string               { return this._priceState.min ? `|${this.priceState.min.shortName}` : ''; }
    get priceConfig(): string                   { return (this.priceStrategy + this.priceMinDisplay) || ''; }

    get supplyStrategy(): string                { return this._supplyState.strategy ? this._supplyState.strategy.shortName : ''; }
    get supplyMin(): number                     { return this._supplyState.min ? this._supplyState.min.value : null; }
    get supplyMinDisplay(): string              { return this._supplyState.min ? `|${this._supplyState.min.shortName}` : ''; }
    get supplyMaxValue(): number                { return this._supplyState.maxValue ? this._supplyState.maxValue.value : null; }
    get supplyMaxValueDisplay(): string         { return this._supplyState.maxValue ? `|${this._supplyState.maxValue.shortName}` : ''; }
    get supplyConfig(): string                  { return (this.supplyStrategy + this.supplyMinDisplay + this.supplyMaxValueDisplay) || ''; }
}
