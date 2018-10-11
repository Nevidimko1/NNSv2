import { Unit } from '../../../models/unitInfo/unit.model';
import { UnitIndicator } from '../../../models/unitInfo/unitIndicator.model';

export class UnitsTableItem {
    private _info: Unit;
    private _productivityDisplay: string;
    private _productivityTomorrowDisplay: string;

    constructor(info: Unit) {
        this._info = info;
        this._productivityDisplay = Math.floor(this._info.productivity * 100) + '%';
        this._productivityTomorrowDisplay = this._info.productivityTomorrow != null ?
            Math.floor(this._info.productivityTomorrow * 100) + '%' : '?';
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


}
